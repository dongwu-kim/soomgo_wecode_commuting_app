import React, {useEffect, useState} from 'react';
import {MainUseCase} from '../../../domain/useCase/main/MainUseCase';

import {useLocation} from '../../hooks/useLocation';
import {useTodayWorkTimeLog} from '../../hooks/useTodayWorkTimeLog';
import {useUserName} from '../../hooks/useUserName';
import {useThisWeekWorkTime} from '../../hooks/useThisWeekWorkTime';
import {Main} from './Main';
import {dayOfWeekDate, endDayNowMonth, startDayNowMonth, todayOfWeek} from '../../../utils/dayjs';
import {useWorkTimeAverage} from '../../hooks/useWorkTimeAverage';

const {checkBusinessDay, pushWorkTimeOfTodayToDB, calcWeekWorkTimeProgress, calcDayWorkTimeProgress} =
  new MainUseCase();

export const MainPresenter = ({navigation, route}: any) => {
  const {params} = route;
  const [workBtn, setWorkBtn] = useState<true | false | null>(null);
  const [timeStamp, setTimeStamp] = useState<number>(0);
  const [userName, userNameLoading] = useUserName();
  const [loadWorkTimeLog, workTimeLogLoading] = useTodayWorkTimeLog(timeStamp);
  const [weekWorkHourMinute, weekWorkLog, weekWorkTime] = useThisWeekWorkTime(timeStamp);
  const [commuteButtonDisabled, setCommuteButtonDisabled] = useState<true | false | null>(null);
  const [startDateFromDatePicker, setStartDateFromDatePicker] = useState<string>(startDayNowMonth());
  const [endDateFromDatePicker, setEndDateFromDatePicker] = useState<string>(endDayNowMonth());
  const [workTimeAverage, workTimeAverageNum, workTimeAverageLoading] = useWorkTimeAverage(
    startDateFromDatePicker,
    endDateFromDatePicker,
    timeStamp,
  );
  const [location, address] = useLocation(timeStamp);

  useEffect(() => {
    // datePicker
    if (params?.startDate && params?.endDate) {
      setStartDateFromDatePicker(params.startDate);
      setEndDateFromDatePicker(params.endDate);
    }

    // 공휴일에는 출퇴근 입력을 할 수 없습니다.
    if (commuteButtonDisabled === null) {
      checkBusinessDay().then(disableValid => {
        setCommuteButtonDisabled(disableValid);
      });
    }
    // 금일 workLog control
    if (!workTimeLogLoading) {
      if (loadWorkTimeLog === null && workBtn === null) {
        setWorkBtn(true);
      }
      if (timeStamp !== 0) {
        pushWorkTimeOfTodayToDB();
      }
    }
  }, [params, timeStamp, workTimeLogLoading]);

  return (
    <Main
      navigation={navigation}
      workBtn={workBtn}
      setWorkBtn={setWorkBtn}
      location={location}
      address={address}
      commuteButtonDisabled={commuteButtonDisabled}
      userName={!userNameLoading && userName ? userName : ''}
      setTimeStamp={setTimeStamp}
      loadWorkTimeLog={loadWorkTimeLog}
      weekWorkLog={weekWorkLog}
      weekWorkHourMinute={weekWorkHourMinute}
      weekWorkTimeProgressPercent={calcWeekWorkTimeProgress(weekWorkTime)}
      startDateFromDatePicker={startDateFromDatePicker}
      endDateFromDatePicker={endDateFromDatePicker}
      workTimeAverage={workTimeAverage}
      workTimeAverageNum={calcDayWorkTimeProgress(workTimeAverageNum)}
    />
  );
};
