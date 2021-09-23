import {useState, useEffect} from 'react';
import {MainUseCase} from '../../domain/useCase/main/MainUseCase';

const {getTimeOfTodayWork} = new MainUseCase();

export const useTodayWorkTimeLog = (timeStamp: number): [string[] | null, true | false] => {
  const [loadWorkTimeLog, setLoadWorkTimeLog] = useState<string[] | null>(null);
  const [workTimeLogLoading, setWorkTimeLogLoading] = useState<true | false>(true);

  useEffect(() => {
    getTimeOfTodayWork().then(todayWorkLog => {
      todayWorkLog !== null && setLoadWorkTimeLog(todayWorkLog);
      setWorkTimeLogLoading(false);
    });
  }, [timeStamp]);

  return [loadWorkTimeLog, workTimeLogLoading];
};
