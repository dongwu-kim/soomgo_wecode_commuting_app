import React from 'react';
import {IDailyWorkLog} from './IDailyWorkLog';
import {ILocation} from './IGeolocation';

export interface IMainProps {
  navigation: any;
  workBtn: true | false | null;
  setWorkBtn: React.Dispatch<React.SetStateAction<boolean | null>>;
  location: ILocation | null;
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
}

export interface IMainWorkThisWeek {
  weekWorkLog: IDailyWorkLog[] | null;
  weekWorkHourMinute: string;
  weekWorkTimeProgressPercent: number;
}

export interface IWorkThisWeek {
  weekWorkLog: IDailyWorkLog[] | null;
}
