import React, {useState} from 'react';
import {Main} from './Main';
import {dayjsNow} from '../../../utils/dayjs';
import { workTime } from '../../../utils/dayjs';

export const MainPresenter = ({navigation}: any) => {
  const [workBtn, setWorkBtn] = useState('출근하기');
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  const workingToggle = () => {
    const CurrentTime = dayjsNow().slice(11, 16);
    if (workBtn === '출근하기') {
      setWorkBtn('퇴근하기');
      setStartTime(workTime());
      setEndTime('');
    } else {
      setWorkBtn('출근하기');
      setEndTime(workTime());
    }
  };
  return (
    <Main
      navigation={navigation}
      startTime={startTime}
      endTime={endTime}
      workBtn={workBtn}
      workingToggle={() => workingToggle()}
    />
  );
};
