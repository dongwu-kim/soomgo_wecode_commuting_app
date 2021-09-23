import React from 'react';
import {IWeeklyWorkLog} from './IWeeklyWorkLog';

export interface IMainProps {
  navigation: any;
  workBtn: true | false;
  address: string;
  userName: string;
  setTimeStamp: React.Dispatch<React.SetStateAction<number>>;
  loadWorkTimeLog: string[] | null;
  weekWorkLog: IWeeklyWorkLog[] | null;
  weekWorkHourMinute: string;
  weekWorkTimeProgressPercent: number;
}

export interface IMainWorkThisWeek {
  weekWorkLog: IWeeklyWorkLog[] | null;
  weekWorkHourMinute: string;
  weekWorkTimeProgressPercent: number;
}

export interface IWorkThisWeek {
  weekWorkLog: IWeeklyWorkLog[] | null;
}
