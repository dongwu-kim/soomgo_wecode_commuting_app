import React, {useEffect, useState} from 'react';
import {WorkLogUseCase} from '../../../domain/useCase/WorkLogUseCase';

import {WorkLog} from './WorkLog';

const workLogLogic = new WorkLogUseCase();
const {buttonDisableTest, getYesterdayWorkLog, getTodayWorkLog} = workLogLogic;

const loadWorkLog = (
  setYesterdayWorkLogText: React.Dispatch<React.SetStateAction<string>>,
  setTodayWorkLogText: React.Dispatch<React.SetStateAction<string>>,
) => {
  getYesterdayWorkLog().then(workLogObj => {
    if (workLogObj !== null) {
      setYesterdayWorkLogText(workLogObj.workLog);
    }
  });
  getTodayWorkLog().then(workLogObj => {
    if (workLogObj !== null) {
      setTodayWorkLogText(workLogObj.workLog);
    }
  });
};

export const WorkLogPresenter = () => {
  const [yesterdayWorkLogText, setYesterdayWorkLogText] = useState<string>('');
  const [todayWorkLogText, setTodayWorkLogText] = useState<string>('');
  const [saveOrInsert, setSaveOrInsert] = useState<string>('저장하기');
  const [saveButtonDisabled, setSaveButtonDisabled] = useState<true | false>(
    true,
  );
  const [insertCheck, setInsertCheck] = useState<true | false>(false);

  useEffect(() => {
    if (!insertCheck) {
      loadWorkLog(setYesterdayWorkLogText, setTodayWorkLogText);
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
      saveOrInsert={saveOrInsert}
      saveButtonDisabled={saveButtonDisabled}
      setInsertCheck={setInsertCheck}
    />
  );
};
