import {UsingFirebaseDB} from '../UsingFirebaseDB';
import {dayOfWeekDate, todayYearMonthDate, yesterdayYearMonthDate} from '../../../utils/dayjs';
import auth from '@react-native-firebase/auth';

import {IWorkLog} from '../../../presentation/interface/IWorkLog';
export class WorkLogRepository extends UsingFirebaseDB {
  async getYesterdayWorkLog(): Promise<IWorkLog | null> {
    const uid = auth().currentUser?.uid;

    try {
      const workLog = await super.getDataFromDB(`${uid}/task/${yesterdayYearMonthDate()}`, 'value', snapshot => {
        return {...snapshot.val()};
      });
      return workLog;
    } catch {
      console.log('yesterdayWorkLog loading Error!');
      return null;
    }
  }
  async getTodayWorkLog(): Promise<IWorkLog | null> {
    const uid = auth().currentUser?.uid;

    try {
      const workLog = await super.getDataFromDB(`${uid}/task/${todayYearMonthDate()}`, 'value', snapshot => {
        return {...snapshot.val()};
      });
      return workLog;
    } catch {
      console.log('todayWorkLog loading Error!');
      return null;
    }
  }

  async getLastWeekWorkLog() {
    const uid = auth().currentUser?.uid;

    try {
      const workLog = await super.getDataFromDB(`${uid}/task/${dayOfWeekDate(-2)}`, 'value', snapshot => {
        return {...snapshot.val()};
      });
      return workLog;
    } catch {
      console.log('lastWeekWorkLog loading Error!');
      return null;
    }
  }

  async setWorkLogInDB(yesterdayLogText: string, todayWorkLogText: string) {
    const uid = auth().currentUser?.uid;

    try {
      await super.setDataToDB(`${uid}/task/${yesterdayYearMonthDate()}/workLog`, yesterdayLogText);
      await super.setDataToDB(`${uid}/task/${todayYearMonthDate()}/workLog`, todayWorkLogText);
      return Boolean(true);
    } catch {
      console.log('DB update Error! : WorkLog');
      return Boolean(false);
    }
  }
}
