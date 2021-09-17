import {IWorkThisWeek} from '../../../presentation/interface/IWorkThisWeek';
import {dayOfWeek, weekOfYear} from '../../../utils/dayjs';

import {UsingFirebaseDB} from '../UsingFirebaseDB';

export class MainRepository extends UsingFirebaseDB {
  getTimeOfWorkThisWeek() {
    const dayNum = dayOfWeek();
    const weekNum = weekOfYear();
    // super.getDataFromDB(`uid/commuteData/${weekNum}/${dayNum}`, 'value', snapshot => {
    //   console.log(snapshot.val());
    // });
    super.getDataFromDB('uid/commuteData/', 'value', snapshot => {
      console.log(Object.entries(snapshot.val()));
    });
  }

  setWorkTimeOfTodayToDB(value: IWorkThisWeek) {
    const dayNum = dayOfWeek();
    const weekNum = weekOfYear();
    super.setDataToDB(`uid/commuteData/${weekNum}/${dayNum}`, value);
  }
}
