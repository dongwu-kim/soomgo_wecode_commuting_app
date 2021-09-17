import {IWorkThisWeek} from '../../presentation/interface/IWorkThisWeek';
import {dayOfWeek, weekOfYear} from '../../utils/dayjs';
import {UsingFirebaseDB} from './UsingFirebaseDB';

export class MainWorkThisWeekRepository extends UsingFirebaseDB {
  getTimeOfWorkThisWeek() {
    const dayNum = dayOfWeek();
    const weekNum = weekOfYear();
    super.getDataFromDB(`uid/commuteData/${weekNum}/${dayNum}`, 'value', snapshot => {
      console.log(snapshot.val());
    });
  }

  setWorkTimeOfTodayToDB(value: IWorkThisWeek) {
    const dayNum = dayOfWeek();
    const weekNum = weekOfYear();
    super.setDataToDB(`uid/commuteData/${weekNum}/${dayNum}`, value);
  }
}