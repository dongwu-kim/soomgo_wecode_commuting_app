import {useState, useEffect} from 'react';
import {MainUseCase} from '../../domain/useCase/main/MainUseCase';

const {getWorkTimeAverage} = new MainUseCase();

export const useWorkTimeAverage = (
  startDateFromDatePicker: string,
  endDateFromDatePicker: string,
  timeStamp: number,
): [string | null, number, true | false] => {
  const [workTimeAverage, setWorkTimeAverage] = useState<string | null>(null);
  const [workTimeAverageNum, setWorkTimeAverageNum] = useState<number>(0);
  const [workTimeAverageLoading, setWorkTimeAverageLoading] = useState<true | false>(true);

  useEffect(() => {
    getWorkTimeAverage(startDateFromDatePicker, endDateFromDatePicker).then(resWorkData => {
      if (resWorkData !== null) {
        const [commuteTimeString, commuteTime] = resWorkData;
        setWorkTimeAverage(commuteTimeString);
        setWorkTimeAverageNum(commuteTime);
        setWorkTimeAverageLoading(false);
      } else {
        setWorkTimeAverage('근무기록이 없습니다.');
        setWorkTimeAverageNum(0);
        setWorkTimeAverageLoading(false);
      }
    });
  }, [startDateFromDatePicker, endDateFromDatePicker, timeStamp]);

  return [workTimeAverage, workTimeAverageNum, workTimeAverageLoading];
};
