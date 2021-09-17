import React, {useEffect, useState} from 'react';
import {MainWorkThisWeekUseCase} from '../../../domain/useCase/main/MainWorkThisWeekUseCase';

import {useLocation} from '../../hooks/useLocation';
import {Main} from './Main';

const mainWorkThisWeekLogic = new MainWorkThisWeekUseCase();
const {setWorkTimeOfToday, getTimeOfWorkThisWeek} = mainWorkThisWeekLogic;

export const MainPresenter = ({navigation}: any) => {
  const [workBtn, setWorkBtn] = useState<string>('출근하기');
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [address] = useLocation();

  useEffect(() => {
    getTimeOfWorkThisWeek();
  }, []);
  return <Main navigation={navigation} workBtn={workBtn} address={address} />;
};
