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

export const dayOfWeekValue = (day: string) => {
  return dayjs(day).day();
};

export const dayOfWeek = (day: string | number) => {
  return dayjs(day).locale('ko').format('ddd');
};

export const dayOfWeekDate = (value: number) => {
  return dayjs().day(value).format('YYYY-MM-DD');
};

export const weekOfYear = () => {
  return dayjs().week();
};

export const calcWeekOfYear = (date: string | number) => {
  return dayjs(date).week();
};

export const workTime = (time: string | number) => {
  dayjs.locale('en');
  return dayjs(time).format('HH:mm A');
};

export const hourMinuteTime = (date: string) => {
  return dayjs(date).format('HH:mm');
};

export const todayMilliSec = () => {
  return dayjs(todayYearMonthDate()).valueOf();
};

export const yearMonthDate = (date: any) => {
  return dayjs(date).format('YYYY-MM-DD');
};

export const startDayNowMonth = () => {
  return dayjs().date(1).format('YYYY-MM-DD');
};

export const endDayNowMonth = () => {
  return dayjs(`${nowYear()}-${nowMonth()}`).endOf('month').format('YYYY-MM-DD');
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

export const stringToMilliSec = (date: string) => {
  return dayjs(date).valueOf();
};

export const calcMiliSecTime = (milliSec: number) => {
  const time = milliSec;
  const hour = Math.floor(time / (60 * 60 * 1000));
  const minute = Math.floor((time / (60 * 1000)) % 60);
  const seconds = Math.floor((time / 1000) % 60);

  const calcTime = `${hour}:${minute < 10 ? '0' + minute : minute}:${seconds < 10 ? '0' + seconds : seconds}`;
  return calcTime;
};

export const calcMiliSecTimeHourMinuteString = (milliSec: number) => {
  const time = milliSec;
  const hour = Math.floor(time / (60 * 60 * 1000));
  const minute = Math.floor((time / (60 * 1000)) % 60);

  const calcTime = `${hour}시간 ${minute < 10 ? '0' + minute : minute}분`;
  return calcTime;
};

export const milliSecondsNumLag = (startTimeStamp: number, endTimeStamp: number) => {
  const time = dayjs(endTimeStamp).valueOf() - dayjs(startTimeStamp).valueOf();
  const hour = Math.floor(time / (60 * 60 * 1000));
  const minute = Math.floor((time / (60 * 1000)) % 60);
  const seconds = Math.floor((time / 1000) % 60);

  const workedTime = `${hour}:${minute < 10 ? '0' + minute : minute}:${seconds < 10 ? '0' + seconds : seconds}`;
  return workedTime;
};
