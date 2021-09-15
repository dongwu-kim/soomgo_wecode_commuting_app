import {WorkLogRepository} from '../../data/repository/WorkLogRepository';

export class WorkLogUseCase extends WorkLogRepository {
  buttonDisableTest(yesterdayTextLength: number, todayTextLength: number) {
    if (
      yesterdayTextLength < 20 ||
      todayTextLength < 20 ||
      yesterdayTextLength >= 300 ||
      todayTextLength >= 300
    ) {
      return true;
    } else {
      return false;
    }
  }
}
