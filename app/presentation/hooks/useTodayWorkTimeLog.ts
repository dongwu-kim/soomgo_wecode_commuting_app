import {useState, useEffect} from 'react';
import {MainUseCase} from '../../domain/useCase/main/MainUseCase';

const {getTimeOfTodayWork} = new MainUseCase();

export const useTodayWorkTimeLog = (): [number[] | null, true | false] => {
  const [loadWorkTimeLog, setLoadWorkTimeLog] = useState<number[] | null>(null);
  const [workTimeLogLoading, setWorkTimeLogLoading] = useState<true | false>(true);

  useEffect(() => {
    getTimeOfTodayWork().then(todayWorkLog => {
      todayWorkLog !== null && setLoadWorkTimeLog(todayWorkLog);
      setWorkTimeLogLoading(false);
    });
  }, []);

  return [loadWorkTimeLog, workTimeLogLoading];
};
