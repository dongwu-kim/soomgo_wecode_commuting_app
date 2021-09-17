import React, {useEffect, useState} from 'react';
import {MainUseCase} from '../../../domain/useCase/main/MainUseCase';

import {useLocation} from '../../hooks/useLocation';
import {useTodayWorkTimeLog} from '../../hooks/useTodayWorkTimeLog';
import {Main} from './Main';

const {pushWorkTimeOfTodayToDB} = new MainUseCase();

export const MainPresenter = ({navigation}: any) => {
  const [workBtn, setWorkBtn] = useState<true | false>(true);
  const [timeStamp, setTimeStamp] = useState<number>(0);
  const [workTimeLog, setWorkTimeLog] = useState<number[] | null>(null);
  const [loadWorkTimeLog, workTimeLogLoading] = useTodayWorkTimeLog();

  const [address] = useLocation();

  useEffect(() => {
    if (!workTimeLogLoading) {
      if (workTimeLog === null && loadWorkTimeLog !== null) {
        setWorkTimeLog(loadWorkTimeLog);
        setWorkBtn(false);
      }
      if (timeStamp !== 0) {
        if (workTimeLog === null && loadWorkTimeLog === null) {
          setWorkTimeLog([timeStamp]);
          pushWorkTimeOfTodayToDB(timeStamp);
          setWorkBtn(false);
        } else if (workTimeLog !== null) {
          setWorkTimeLog([...workTimeLog, timeStamp]);
          pushWorkTimeOfTodayToDB(timeStamp);
          setWorkBtn(false);
        }
      }
    }
  }, [timeStamp, workTimeLogLoading]);

  return <Main navigation={navigation} workBtn={workBtn} address={address} setTimeStamp={setTimeStamp} />;
};
