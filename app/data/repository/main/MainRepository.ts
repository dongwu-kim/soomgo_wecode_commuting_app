import {UsingFirebaseDB} from '../UsingFirebaseDB';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import {
  parseMiliSecToYearMonth,
  parseMilliSecToTime,
  weekOfYear,
  todayMilliSec,
  calcMiliSecTimeHourMinuteString,
  workTime,
  dayOfWeekDate,
  dayOfWeekValue,
  calcWeekOfYear,
  stringToMilliSec,
  dayOfWeek,
} from '../../../utils/dayjs';

import {IDailyWorkLog} from '../../../presentation/interface/IDailyWorkLog';

export class MainRepository extends UsingFirebaseDB {
  async getHoliday(): Promise<string[] | null> {
    try {
      const holiday = await super.getDataFromDB('/holiday', 'value', snapshot => {
        return snapshot.val();
      });
      return holiday;
    } catch {
      return null;
    }
  }

  async getUserName(): Promise<string | null> {
    const uid = auth().currentUser?.uid;

    try {
      const userName = await super.getDataFromDB(`/${uid}/userInfo/givenName`, 'value', snapshot => {
        return snapshot.val();
      });
      return userName ? userName : null;
    } catch {
      return null;
    }
  }

  async getTimeOfTodayWork(): Promise<any | null> {
    const uid = auth().currentUser?.uid;

    const dayNum = todayMilliSec();
    const weekNum = weekOfYear();

    try {
      const todayWorkLog = await super.getDataFromDB(`/${uid}/commuteData/${weekNum}/${dayNum}`, 'value', snapshot => {
        const sortSnapshot = Object.values(snapshot.val()).sort();
        const start = sortSnapshot[0];
        const end = sortSnapshot[sortSnapshot.length - 1];

        return [workTime(start), workTime(end)];
      });
      return todayWorkLog !== null ? todayWorkLog : null;
    } catch {
      return null;
    }
  }

  setWorkTimeOfTodayToDB(value: number) {
    const uid = auth().currentUser?.uid;

    const dayNum = todayMilliSec();
    const weekNum = weekOfYear();
    super.setDataToDB(`/${uid}/commuteData/${weekNum}/${dayNum}`, value);
  }

  pushWorkTimeOfTodayToDB() {
    const uid = auth().currentUser?.uid;

    const dayNum = todayMilliSec();
    const weekNum = weekOfYear();

    // const serverTimeStamp = super.usingServerTimeStamp();

    super.pushDataInDB(`/${uid}/commuteData/${weekNum}/${dayNum}`, super.usingServerTimeStamp());
  }

  async getWorkThisWeekInfo(): Promise<[string, IDailyWorkLog[], number] | null> {
    const uid = auth().currentUser?.uid;

    const weekNum = weekOfYear();
    try {
      const weeklyWorkData = super.getDataFromDB(`/${uid}/commuteData/${weekNum}`, 'value', snapshot => {
        let weekWorkTime = 0;
        let weeklyWorkLog: IDailyWorkLog[] = [];

        // generate Log
        for (let i = 0; i <= 4; i++) {
          const log = {
            day: dayOfWeekDate(i + 1),
            start: '',
            end: '',
          };
          weeklyWorkLog.push(log);
        }

        snapshot.val() &&
          Object.entries(snapshot.val())
            .sort()
            .forEach(elem => {
              const [day, stamp]: [string, any] = elem;
              const start: any = Object.values(stamp).sort()[0];
              const end: any = Object.values(stamp).sort()[Object.values(stamp).length - 1];
              const timeLag = end - start;
              const dayDate = parseMiliSecToYearMonth(parseInt(day, 10));
              const log = {
                day: dayDate,
                start: parseMilliSecToTime(start),
                end: parseMilliSecToTime(end),
              };

              // 기존 log array 요소 변경
              dayOfWeek(dayDate) !== '토' &&
                dayOfWeek(dayDate) !== '일' &&
                weeklyWorkLog.splice(dayOfWeekValue(dayDate) - 1, 1, log);
              weekWorkTime += timeLag;
            });

        const weekWorkTimeHourMinute = calcMiliSecTimeHourMinuteString(weekWorkTime);

        return [weekWorkTimeHourMinute, weeklyWorkLog, weekWorkTime];
      });
      return weeklyWorkData;
    } catch {
      return null;
    }
  }

  async getWorkTimeAverage(startDate: string, endDate: string): Promise<any | null> {
    const uid = auth().currentUser?.uid;

    const startWeek = calcWeekOfYear(startDate);
    const endWeek = calcWeekOfYear(endDate);
    let commuteDayArray: string[] = [];
    let commuteTime = 0;

    try {
      let commuteData = await database()
        .ref(`/${uid}/commuteData`)
        .orderByKey()
        .startAt(`${startWeek}`)
        .endAt(`${endWeek}`)
        .once('value', snapshot => {
          return snapshot.val();
        });

      // 해당 일자 사이의 timeStamp 값 commuteDayArray에 저장.
      Object.values(Object.values(commuteData)[0].value).forEach((week: any) => {
        Object.keys(week).forEach(day => {
          if (stringToMilliSec(startDate) < parseInt(day, 10) || parseInt(day, 10) < stringToMilliSec(endDate)) {
            commuteDayArray.push(day);
          }
        });
      });

      Object.values(Object.values(commuteData)[0].value).forEach((week: any) => {
        commuteDayArray.forEach(commuteDate => {
          if (week[commuteDate]) {
            let start: any = Object.values(week[commuteDate]).sort()[0];
            let end: any = Object.values(week[commuteDate]).sort()[Object.values(week[commuteDate]).sort().length - 1];
            commuteTime = end - start + commuteTime;
          }
        });
      });
      return [
        commuteDayArray.length > 0
          ? calcMiliSecTimeHourMinuteString(commuteTime / commuteDayArray.length)
          : calcMiliSecTimeHourMinuteString(commuteTime),
        commuteDayArray.length > 0 ? commuteTime / commuteDayArray.length : commuteTime,
      ];
    } catch {
      return null;
    }
  }
}
