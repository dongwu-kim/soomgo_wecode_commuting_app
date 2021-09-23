import React from 'react';

export interface IMainProps {
  navigation: any;
  workBtn: true | false;
  address: string;
  setTimeStamp: React.Dispatch<React.SetStateAction<number>>;
  weekWorkHourMinute: string;
  weekWorkTimeProgressPercent: number;
}

export interface IMainWorkThisWeek {
  weekWorkHourMinute: string;
  weekWorkTimeProgressPercent: number;
}
