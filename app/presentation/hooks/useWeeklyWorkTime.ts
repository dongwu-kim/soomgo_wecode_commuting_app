import {useState, useEffect} from 'react';
import {MainUseCase} from '../../domain/useCase/main/MainUseCase';
import {IWeeklyWorkLog} from '../interface/IWeeklyWorkLog';

const {getTimeOfWorkThisWeek} = new MainUseCase();

export const useWeeklyWorkTime = (timeStamp: number): [string, IWeeklyWorkLog[] | null, number] => {
  const [weeklyWorkHourMinute, setWeeklyWorkTime] = useState<string>('');
  const [weeklyWorkLog, setWeeklyWorkLog] = useState<IWeeklyWorkLog[] | null>(null);
  const [weekWorkTime, setWeekWorkTime] = useState<number>(0);

  useEffect(() => {
    getTimeOfWorkThisWeek().then(weeklyWorkData => {
      if (weeklyWorkData !== null) {
        const [hourMinute, log, time] = weeklyWorkData;
        setWeeklyWorkTime(hourMinute);
        setWeeklyWorkLog(log);
        setWeekWorkTime(time);
      }
    });
  }, [timeStamp]);

  return [weeklyWorkHourMinute, weeklyWorkLog, weekWorkTime];
};
