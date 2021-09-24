import React from 'react';
import {IDailyWorkLog} from './IDailyWorkLog';

export interface IMainProps {
  navigation: any;
  workBtn: true | false;
  address: string;
  commuteButtonDisabled: true | false | null;
  userName: string;
  setTimeStamp: React.Dispatch<React.SetStateAction<number>>;
  loadWorkTimeLog: string[] | null;
  weekWorkLog: IDailyWorkLog[] | null;
  weekWorkHourMinute: string;
  weekWorkTimeProgressPercent: number;
  startDateFromDatePicker: string;
  endDateFromDatePicker: string;
  workTimeAverage: string | null;
  workTimeAverageNum: number;
  checkHoliday: () => boolean;
}

export interface IMainWorkThisWeek {
  weekWorkLog: IDailyWorkLog[] | null;
  weekWorkHourMinute: string;
  weekWorkTimeProgressPercent: number;
}

export interface IWorkThisWeek {
  weekWorkLog: IDailyWorkLog[] | null;
}
