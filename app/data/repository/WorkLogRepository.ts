import {UsingFirebaseDB} from './UsingFirebaseDB';
import {todayYearMonthDate, yesterdayYearMonthDate} from '../../utils/dayjs';

import {IWorkLog} from '../../presentation/interface/IWorkLog';
export class WorkLogRepository extends UsingFirebaseDB {
  async getYesterdayWorkLog(): Promise<IWorkLog | null> {
    try {
      const workLog = await super.getDataFromDB(`/uid/task/${yesterdayYearMonthDate()}`, 'value', snapshot => {
        return {...snapshot.val()};
      });
      return workLog;
    } catch {
      console.log('yesterdayWorkLog loading Error!');
      return null;
    }
  }
  async getTodayWorkLog(): Promise<IWorkLog | null> {
    try {
      const workLog = await super.getDataFromDB(`/uid/task/${todayYearMonthDate()}`, 'value', snapshot => {
        return {...snapshot.val()};
      });
      return workLog;
    } catch {
      console.log('todayWorkLog loading Error!');
      return null;
    }
  }

  async setWorkLogInDB(yesterdayLogText: string, todayWorkLogText: string) {
    try {
      await super.setDataToDB(`/uid/task/${yesterdayYearMonthDate()}/workLog`, yesterdayLogText);
      await super.setDataToDB(`/uid/task/${todayYearMonthDate()}/workLog`, todayWorkLogText);
    } catch {
      console.log('DB update Error! : WorkLog');
    }
  }
}
