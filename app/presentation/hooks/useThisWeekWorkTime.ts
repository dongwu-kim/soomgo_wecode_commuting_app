import {useState, useEffect} from 'react';
import {MainUseCase} from '../../domain/useCase/main/MainUseCase';
import {IDailyWorkLog} from '../interface/IDailyWorkLog';

const {getWorkThisWeekInfo, checkHolidayInThisWeek} = new MainUseCase();

export const useThisWeekWorkTime = (timeStamp: number): [string, IDailyWorkLog[] | null, number] => {
  const [weeklyWorkHourMinute, setWeeklyWorkTime] = useState<string>('');
  const [weekWorkLog, setWeekWorkLog] = useState<IDailyWorkLog[] | null>(null);
  const [weekWorkTime, setWeekWorkTime] = useState<number>(0);

  useEffect(() => {
    getWorkThisWeekInfo().then(weeklyWorkData => {
      if (weeklyWorkData !== null) {
        const [hourMinute, log, time] = weeklyWorkData;
        setWeeklyWorkTime(hourMinute);
        checkHolidayInThisWeek(log).then(newLog => setWeekWorkLog(newLog));
        setWeekWorkTime(time);
      }
    });
  }, [timeStamp]);

  return [weeklyWorkHourMinute, weekWorkLog, weekWorkTime];
};
