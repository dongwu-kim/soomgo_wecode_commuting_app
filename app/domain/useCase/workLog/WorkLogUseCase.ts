import {WorkLogRepository} from '../../../data/repository/workLog/WorkLogRepository';

export class WorkLogUseCase extends WorkLogRepository {
  buttonDisableTest(yesterdayTextLength: number, todayTextLength: number) {
    if (yesterdayTextLength < 20 || todayTextLength < 20 || yesterdayTextLength >= 300 || todayTextLength >= 300) {
      return true;
    } else {
      return false;
    }
  }

  saveWorkLog(yesterdayWorkLogText: string | undefined, todayWorkLogText: string | undefined) {
    if (yesterdayWorkLogText === undefined || todayWorkLogText === undefined) {
      return;
    }

    if (
      yesterdayWorkLogText.length < 20 ||
      todayWorkLogText.length < 20 ||
      yesterdayWorkLogText.length >= 300 ||
      todayWorkLogText.length >= 300
    ) {
      return;
    } else {
      return super.setWorkLogInDB(yesterdayWorkLogText, todayWorkLogText);
    }
  }

  loadBothWorkLog = async (): Promise<(string | undefined)[]> => {
    try {
      const yesterdayWorkLogObj = await super.getYesterdayWorkLog().then(workLogObj => {
        if (workLogObj?.workLog) {
          return workLogObj.workLog;
        } else {
          return '';
        }
      });
      const todayWorkLogObj = await super.getTodayWorkLog().then(workLogObj => {
        if (workLogObj?.workLog) {
          return workLogObj.workLog;
        } else {
          return '';
        }
      });
      return [yesterdayWorkLogObj, todayWorkLogObj];
    } catch {
      return ['', ''];
    }
  };
}
