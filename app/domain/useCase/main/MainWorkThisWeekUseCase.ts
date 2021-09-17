import {MainRepository} from '../../../data/repository/main/MainRepository';
import {milliSecondsLag, timeLag} from '../../../utils/dayjs';

export class MainWorkThisWeekUseCase extends MainRepository {
  setWorkTimeOfToday(startTime: string, endTime: string) {
    const timeDiff = timeLag(startTime, endTime);
    const milliDiff = milliSecondsLag(startTime, endTime);

    super.setWorkTimeOfTodayToDB({
      end: startTime,
      start: endTime,
      time: milliDiff,
      timeLag: timeDiff,
    });
  }
}
