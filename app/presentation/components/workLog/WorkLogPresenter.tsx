import React, {useEffect, useState} from 'react';
import {WorkLogUseCase} from '../../../domain/useCase/workLog/WorkLogUseCase';

import {WorkLog} from './WorkLog';

const workLogLogic = new WorkLogUseCase();
const {buttonDisableTest, loadBothWorkLog, saveWorkLog} = workLogLogic;

export const WorkLogPresenter = () => {
  const [yesterdayWorkLogText, setYesterdayWorkLogText] = useState<string | undefined>('');
  const [todayWorkLogText, setTodayWorkLogText] = useState<string | undefined>('');
  const [saveButtonDisabled, setSaveButtonDisabled] = useState<true | false>(true);
  const [insertCheck, setInsertCheck] = useState<true | false>(false);

  const loadWorkLog = () => {
    loadBothWorkLog().then(([yesterdayWorkLog, todayWorkLog]) => {
      if (yesterdayWorkLog) {
        setYesterdayWorkLogText(yesterdayWorkLog);
      }
      if (todayWorkLog) {
        setTodayWorkLogText(todayWorkLog);
      }
    });
  };

  useEffect(() => {
    if (!insertCheck) {
      loadWorkLog();
    }

    if (yesterdayWorkLogText !== undefined && todayWorkLogText !== undefined) {
      buttonDisableTest(yesterdayWorkLogText.length, todayWorkLogText.length)
        ? setSaveButtonDisabled(true)
        : setSaveButtonDisabled(false);
    }
  }, [yesterdayWorkLogText, todayWorkLogText, insertCheck]);

  return (
    <WorkLog
      yesterdayWorkLogText={yesterdayWorkLogText}
      todayWorkLogText={todayWorkLogText}
      setYesterdayWorkLogText={setYesterdayWorkLogText}
      setTodayWorkLogText={setTodayWorkLogText}
      saveButtonDisabled={saveButtonDisabled}
      insertCheck={insertCheck}
      setInsertCheck={setInsertCheck}
      saveWorkLog={() => {
        saveWorkLog(yesterdayWorkLogText, todayWorkLogText);
      }}
    />
  );
};
