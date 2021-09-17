import {UsingFirebaseDB} from '../UsingFirebaseDB';
import auth from '@react-native-firebase/auth';

import {IWorkToday} from '../../../presentation/interface/IWorkToday';
import {todayMilliSec, weekOfYear} from '../../../utils/dayjs';

export class MainRepository extends UsingFirebaseDB {
  getTimeOfWorkThisWeek() {
    const uid = auth().currentUser?.uid;

    const dayNum = todayMilliSec();
    const weekNum = weekOfYear();
    super.getDataFromDB(`/${uid}/commuteData/${weekNum}/${dayNum}`, 'value', snapshot => {
      console.log(snapshot.val());
    });
  }

  async getTimeOfTodayWork(): Promise<any | null> {
    const uid = auth().currentUser?.uid;

    const dayNum = todayMilliSec();
    const weekNum = weekOfYear();

    try {
      console.log(uid);
      const todayWorkLog = await super.getDataFromDB(`/${uid}/commuteData/${weekNum}/${dayNum}`, 'value', snapshot => {
        return snapshot.val();
      });
      return todayWorkLog;
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
}
