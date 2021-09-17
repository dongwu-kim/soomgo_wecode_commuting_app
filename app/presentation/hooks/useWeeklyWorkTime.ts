import {useState, useEffect} from 'react';
import {MainUseCase} from '../../domain/useCase/main/MainUseCase';
import {IWeeklyWorkLog} from '../interface/IWeeklyWorkLog';

const {getTimeOfWorkThisWeek} = new MainUseCase();

export const useWeeklyWorkTime = () => {
  const [weeklyWorkTime, setWeeklyWorkTime] = useState<string | undefined>('');
  const [weeklyWorkLog, setWeeklyWorkLog] = useState<IWeeklyWorkLog[] | null>(null);

  useEffect(() => {
    getTimeOfWorkThisWeek().then(weeklyWorkData => {
      if (weeklyWorkData !== null) {
        const [time, log] = weeklyWorkData;
        setWeeklyWorkLog(log);
        setWeeklyWorkTime(time);
      }
    });
  }, []);

  return [weeklyWorkTime, weeklyWorkLog];
};
