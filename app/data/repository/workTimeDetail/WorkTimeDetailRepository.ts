import {UsingFirebaseDB} from '../UsingFirebaseDB';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {calcWeekOfYear, parseMiliSecToYearMonth, stringToMilliSec, workTime} from '../../../utils/dayjs';
import {IWorkTimeInfo} from '../../../presentation/interface/IWorkTimeInfo';

export class WorkTimeDetailRepository extends UsingFirebaseDB {
  async getWorkTimeDetailLog(startDate: string, endDate: string): Promise<IWorkTimeInfo[] | null> {
    const uid = auth().currentUser?.uid;

    const startWeek = calcWeekOfYear(startDate);
    const endWeek = calcWeekOfYear(endDate);
    let commuteDayArray: string[] = [];
    let workTimeInfoArray: IWorkTimeInfo[] = [];

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
        commuteDayArray.sort().forEach(commuteDate => {
          if (week[commuteDate]) {
            let start: any = Object.values(week[commuteDate]).sort()[0];
            let end: any = Object.values(week[commuteDate]).sort()[Object.values(week[commuteDate]).sort().length - 1];
            let startLog = {
              id: commuteDate + 'start',
              date: parseMiliSecToYearMonth(parseInt(commuteDate, 10)),
              timeStamp: workTime(start),
              recentText: '출근',
            };
            let endLog = {
              id: commuteDate + 'end',
              date: parseMiliSecToYearMonth(parseInt(commuteDate, 10)),
              timeStamp: workTime(end),
              recentText: '퇴근',
            };

            workTimeInfoArray = [...workTimeInfoArray, startLog, endLog];
          }
        });
      });
      return workTimeInfoArray;
    } catch {
      return null;
    }
  }
}
