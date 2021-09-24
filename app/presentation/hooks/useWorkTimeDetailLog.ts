import {useState, useEffect} from 'react';
import {WorkTimeDetailUseCase} from '../../domain/useCase/workTimeDetail/WorkTimeDetailUseCase';
import {IWorkTimeInfo} from '../interface/IWorkTimeInfo';

const {getWorkTimeDetailLog} = new WorkTimeDetailUseCase();

export const useWorkTimeDetailLog = (startDate: string, endDate: string): [IWorkTimeInfo[] | null, true | false] => {
  const [workTimeLog, setWorkTimeLog] = useState<IWorkTimeInfo[] | null>(null);
  const [workTimeLogLoading, setWorkTimeLogLoading] = useState<true | false>(true);

  useEffect(() => {
    getWorkTimeDetailLog(startDate, endDate).then(detailLog => {
      setWorkTimeLog(detailLog);
      setWorkTimeLogLoading(false);
    });
  }, [startDate, endDate]);
  return [workTimeLog, workTimeLogLoading];
};
