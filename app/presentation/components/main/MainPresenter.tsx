import React, {useEffect, useState} from 'react';
import {MainUseCase} from '../../../domain/useCase/main/MainUseCase';

import {useLocation} from '../../hooks/useLocation';
import {useTodayWorkTimeLog} from '../../hooks/useTodayWorkTimeLog';
import {useUserName} from '../../hooks/useUserName';
import {useWeeklyWorkTime} from '../../hooks/useWeeklyWorkTime';
import {Main} from './Main';

const {setWorkTimeOfTodayToDB, pushWorkTimeOfTodayToDB, calcWeekWorkTimeProgress, getTodayWorkLog} = new MainUseCase();

export const MainPresenter = ({navigation}: any) => {
  const [workBtn, setWorkBtn] = useState<true | false>(true);
  const [timeStamp, setTimeStamp] = useState<number>(0);
  const [userName, userNameLoading] = useUserName();
  const [loadWorkTimeLog, workTimeLogLoading] = useTodayWorkTimeLog(timeStamp);
  const [weekWorkHourMinute, weeklyWorkLog, weekWorkTime] = useWeeklyWorkTime(timeStamp);

  const [address] = useLocation();

  useEffect(() => {
    // 금일 workLog control
    if (!workTimeLogLoading) {
      if (loadWorkTimeLog !== null) {
        setWorkBtn(false);
      }
      if (timeStamp !== 0) {
        pushWorkTimeOfTodayToDB(timeStamp);
        setWorkBtn(false);
      }
    }
  }, [timeStamp, workTimeLogLoading]);

  return (
    <Main
      navigation={navigation}
      workBtn={workBtn}
      address={address}
      userName={!userNameLoading && userName ? userName : ''}
      setTimeStamp={setTimeStamp}
      loadWorkTimeLog={loadWorkTimeLog}
      weekWorkHourMinute={weekWorkHourMinute}
      weekWorkTimeProgressPercent={calcWeekWorkTimeProgress(weekWorkTime)}
    />
  );
};
