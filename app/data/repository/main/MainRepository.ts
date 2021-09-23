import {UsingFirebaseDB} from '../UsingFirebaseDB';
import auth from '@react-native-firebase/auth';

import {
  parseMiliSecToYearMonth,
  parseMilliSecToTime,
  weekOfYear,
  todayMilliSec,
  calcMiliSecTimeHourMinuteString,
  workTime,
  dayOfWeekDate,
  dayOfWeekValue,
} from '../../../utils/dayjs';

import {IWeeklyWorkLog} from '../../../presentation/interface/IWeeklyWorkLog';

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

  pushWorkTimeOfTodayToDB(value: any) {
    const uid = auth().currentUser?.uid;

    const dayNum = todayMilliSec();
    const weekNum = weekOfYear();
    super.pushDataInDB(`/${uid}/commuteData/${weekNum}/${dayNum}`, value);
  }

  async getWorkThisWeekInfo(): Promise<[string, IWeeklyWorkLog[], number] | null> {
    const uid = auth().currentUser?.uid;

    const weekNum = weekOfYear();
    try {
      const weeklyWorkData = super.getDataFromDB(`/${uid}/commuteData/${weekNum}`, 'value', snapshot => {
        let weekWorkTime = 0;
        let weeklyWorkLog: IWeeklyWorkLog[] = [];

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
}
