import {UsingFirebaseDB} from '../UsingFirebaseDB';
import auth from '@react-native-firebase/auth';

import {IWorkToday} from '../../../presentation/interface/IWorkToday';
import {
  parseMiliSecToYearMonth,
  parseMilliSecToTime,
  weekOfYear,
  calcMiliSecTime,
  todayMilliSec,
} from '../../../utils/dayjs';

import {IWeeklyWorkLog} from '../../../presentation/interface/IWeeklyWorkLog';

export class MainRepository extends UsingFirebaseDB {
  async getTimeOfTodayWork(): Promise<any | null> {
    const uid = auth().currentUser?.uid;

    const dayNum = todayMilliSec();
    const weekNum = weekOfYear();

    try {
      const todayWorkLog = await super.getDataFromDB(`/${uid}/commuteData/${weekNum}/${dayNum}`, 'value', snapshot => {
        return snapshot.val();
      });
      return Object.values(todayWorkLog);
    } catch {
      return null;
    }
  }

  setWorkTimeOfTodayToDB(value: IWorkToday) {
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

  async getTimeOfWorkThisWeek(): Promise<[string, IWeeklyWorkLog[]] | null> {
    const uid = auth().currentUser?.uid;

    const weekNum = weekOfYear();
    try {
      const weeklyWorkData = super.getDataFromDB(`/${uid}/commuteData/${weekNum}`, 'value', snapshot => {
        let sumNum = 0;
        let weeklyWorkLog: IWeeklyWorkLog[] = [];

        Object.entries(snapshot.val())
          .sort()
          .forEach(elem => {
            const [day, stamp]: [string, any] = elem;
            const start: any = Object.values(stamp).sort()[0];
            const end: any = Object.values(stamp).sort()[Object.values(stamp).length - 1];
            const timeLag = end - start;
            const log = {
              day: parseMiliSecToYearMonth(parseInt(day, 10)),
              start: parseMilliSecToTime(start),
              end: parseMilliSecToTime(end),
            };
            weeklyWorkLog.push(log);
            sumNum += timeLag;
          });

        const weekWorkTime = calcMiliSecTime(sumNum);

        return [weekWorkTime, weeklyWorkLog];
      });
      return weeklyWorkData;
    } catch {
      return null;
    }
  }
}
