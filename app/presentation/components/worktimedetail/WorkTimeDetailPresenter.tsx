import React, {useState, useEffect} from 'react';
import {endDayNowMonth, startDayNowMonth} from '../../../utils/dayjs';
import {useWorkTimeDetailLog} from '../../hooks/useWorkTimeDetailLog';
import {WorkTimeDetail} from './WorkTimeDetail';

export const WorkTimeDetailPresenter = ({navigation, route}: any) => {
  const {params} = route;
  const [startDate, setStartDate] = useState<string>(startDayNowMonth());
  const [endDate, setEndDate] = useState<string>(endDayNowMonth());
  const [workTimeDetailLog, workTimeDetailLogLoading] = useWorkTimeDetailLog(startDate, endDate);

  useEffect(() => {
    // datePicker
    if (params?.startDate && params?.endDate) {
      setStartDate(params.startDate);
      setEndDate(params.endDate);
    }
  }, [params]);
  return (
    <WorkTimeDetail
      navigation={navigation}
      startDate={startDate}
      endDate={endDate}
      workTimeDetailLog={workTimeDetailLog}
      workTimeDetailLogLoading={workTimeDetailLogLoading}
    />
  );
};
