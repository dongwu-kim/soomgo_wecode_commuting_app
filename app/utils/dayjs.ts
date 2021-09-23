import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import 'dayjs/plugin/weekday';
import week from 'dayjs/plugin/weekOfYear';

dayjs.locale('ko');
dayjs.extend(week);

export const dayjsNow = () => {
  return dayjs().format('YYYY-MM-DD HH:mm:ss');
};

export const nowYear = () => {
  return dayjs().year();
};

export const nowMonth = () => {
  return dayjs().month() + 1;
};

export const nowDate = () => {
  return dayjs().date();
};

export const nowTime = () => {
  return `${dayjs().hour()}:${dayjs().minute()}:${dayjs().second()}`;
};

export const nowDateArray = () => {
  return [nowYear(), nowMonth(), nowDate()];
};

export const nowMilliSec = () => {
  return dayjs().valueOf();
};

export const todayYearMonthDate = () => {
  return dayjs().format('YYYY-MM-DD');
};

export const yesterdayYearMonthDate = () => {
  const yesterday = `${nowYear()}-${nowMonth()}-${nowDate() - 1}`;
  return dayjs(yesterday).format('YYYY-MM-DD');
};

export const todayOfWeek = () => {
  return dayjs(todayYearMonthDate()).day();
};

export const dayOfWeek = (day: string | number) => {
  return dayjs(day).locale('ko').format('ddd');
};

export const weekOfYear = () => {
  return dayjs().week();
};

export const workTime = (time: any) => {
  dayjs.locale('en');
  return dayjs(time).format('HH:mm A');
};

export const todayMilliSec = () => {
  return dayjs(todayYearMonthDate()).valueOf();
};

export const timeLag = (fromDayString: string, subDayString: string) => {
  const time = dayjs(subDayString).valueOf() - dayjs(fromDayString).valueOf();
  const hour = Math.floor(time / (60 * 60 * 1000));
  const minute = Math.floor((time / (60 * 1000)) % 60);
  const seconds = Math.floor((time / 1000) % 60);

  const workedTime = `${hour}:${minute < 10 ? '0' + minute : minute}:${seconds < 10 ? '0' + seconds : seconds}`;
  return workedTime;
};

export const parseMiliSecToYearMonth = (milliSec: number) => {
  return dayjs(milliSec).format('YYYY-MM-DD');
};

export const parseMilliSecToTime = (milliSec: number) => {
  return dayjs(milliSec).format('YYYY-MM-DD HH:mm:ss');
};

export const calcMiliSecTime = (milliSec: number) => {
  const time = milliSec;
  const hour = Math.floor(time / (60 * 60 * 1000));
  const minute = Math.floor((time / (60 * 1000)) % 60);
  const seconds = Math.floor((time / 1000) % 60);

  const workedTime = `${hour}:${minute < 10 ? '0' + minute : minute}:${seconds < 10 ? '0' + seconds : seconds}`;
  return workedTime;
};

export const calcMiliSecTimeHourMinuteString = (milliSec: number) => {
  const time = milliSec;
  const hour = Math.floor(time / (60 * 60 * 1000));
  const minute = Math.floor((time / (60 * 1000)) % 60);

  const workedTime = `${hour}시간 ${minute < 10 ? '0' + minute : minute}분`;
  return workedTime;
};

export const milliSecondsNumLag = (startTimeStamp: number, endTimeStamp: number) => {
  const time = dayjs(endTimeStamp).valueOf() - dayjs(startTimeStamp).valueOf();
  const hour = Math.floor(time / (60 * 60 * 1000));
  const minute = Math.floor((time / (60 * 1000)) % 60);
  const seconds = Math.floor((time / 1000) % 60);

  const workedTime = `${hour}:${minute < 10 ? '0' + minute : minute}:${seconds < 10 ? '0' + seconds : seconds}`;
  return workedTime;
};
