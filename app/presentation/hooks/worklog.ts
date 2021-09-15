import {useState, useEffect} from 'react';

import {WorkLogUseCase} from '../../domain/useCase/WorkLogUseCase';
import {IWorkLog} from '../interface/IWorkLog';

const workLogLogic = new WorkLogUseCase();
const {getYesterdayWorkLog, getTodayWorkLog} = workLogLogic;

export const useLoadWorkLog = () => {
  const [yesterdayWorkLogFromDB, setYesterdayWorkLogFromDB] =
    useState<IWorkLog | null>(null);
  const [todayWorkLogFromDB, setTodayWorkLogFromDB] = useState<IWorkLog | null>(
    null,
  );
  console.log(todayWorkLogFromDB);
  useEffect(() => {
    if (yesterdayWorkLogFromDB === null && todayWorkLogFromDB === null) {
      getYesterdayWorkLog().then(workLog => {
        setYesterdayWorkLogFromDB(workLog);
      });
      getTodayWorkLog().then(workLog => {
        setTodayWorkLogFromDB(workLog);
      });
    }
  }, []);

  return [yesterdayWorkLogFromDB, todayWorkLogFromDB];
};
