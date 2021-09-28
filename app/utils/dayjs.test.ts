import {
  dayjsNow,
  nowYear,
  nowMonth,
  nowDate,
  nowTime,
  nowDateArray,
  nowMilliSec,
  todayYearMonthDate,
  dayOfWeekValue,
  dayOfWeek,
  dayOfWeekDate,
  weekOfYear,
  calcWeekOfYear,
} from './dayjs';

const NOW_YEAR_NUM: number = 2021;

test('[DayJS Logic] dayjsNow test : 현재 시각 string을 범위 내에서 반환하는가?', () => {
  const [yearMonthDate, time] = dayjsNow().split(' ');
  const [year, month, day] = yearMonthDate.split('-');
  const [hour, minute, sec] = time.split(':');

  expect(parseInt(year, 10)).toEqual(NOW_YEAR_NUM);
  expect(parseInt(month, 10)).toBeLessThanOrEqual(12);
  expect(parseInt(day, 10)).toBeLessThanOrEqual(31);
  expect(parseInt(hour, 10)).toBeLessThanOrEqual(23);
  expect(parseInt(minute, 10)).toBeLessThanOrEqual(59);
  expect(parseInt(sec, 10)).toBeLessThanOrEqual(59);
});

test('[DayJS Logic] nowYear test : year number를 반환하는가?', () => {
  expect(nowYear()).toEqual(NOW_YEAR_NUM);
});

test('[DayJS Logic] nowMonth test : month number를 반환하는가?', () => {
  expect(nowMonth()).toBeLessThanOrEqual(12);
});

test('[DayJS Logic] nowDate test : day number를 반환하는가?', () => {
  expect(nowDate()).toBeLessThanOrEqual(31);
});

test('[DayJS Logic] nowTime test : 현재 시각(hh:mm:ss) string을 범위 내에서 반환하는가?', () => {
  const [hour, minute, sec] = nowTime().split(':');

  expect(parseInt(hour, 10)).toBeLessThanOrEqual(23);
  expect(parseInt(minute, 10)).toBeLessThanOrEqual(59);
  expect(parseInt(sec, 10)).toBeLessThanOrEqual(59);
});

test('[DayJS Logic] nowDateArray test : 배열 내 현재 yearMonth data를 포함하고 있는가?', () => {
  const yearMonthArr = nowDateArray();
  const [year, month, day] = yearMonthArr;
  expect(yearMonthArr).toHaveLength(3);
  expect(year).toEqual(NOW_YEAR_NUM);
  expect(month).toBeLessThanOrEqual(12);
  expect(day).toBeLessThanOrEqual(31);
});

test('[DayJS Logic] nowMilliSec test : milliSec 자리수(13) 검사', () => {
  expect(nowMilliSec().toString().length).toEqual(13);
});

test('[DayJS Logic] todayYearMonthDate test : 현재 년, 월, 일 string data 검사', () => {
  const [year, month, day] = todayYearMonthDate().split('-');
  expect(parseInt(year, 10)).toEqual(NOW_YEAR_NUM);
  expect(parseInt(month, 10)).toBeLessThanOrEqual(12);
  expect(parseInt(day, 10)).toBeLessThanOrEqual(31);
});

test('[DayJS Logic] dayOfWeekValue test : (I)yearMonth string (O)dayNum(0-6) 반환 검사', () => {
  expect(dayOfWeekValue('2021-09-28')).toEqual(2);
});

test('[DayJS Logic] dayOfWeek test : (I)yearMonth string | milliSec (O)요일 string 반환 검사', () => {
  expect(dayOfWeek('2021-09-28')).toMatch(/(월|화|수|목|금|토|일)/);
  expect(dayOfWeek(1632754800000)).toMatch(/(월|화|수|목|금|토|일)/);
});

test('[DayJS Logic] dayOfWeekDate test : (I)dayNum(0-6) (O)yearMonth string 반환 검사', () => {
  for (let i = 0; i <= 6; i++) {
    const [year, month, day] = dayOfWeekDate(i).split('-');
    expect(parseInt(year, 10)).toEqual(NOW_YEAR_NUM);
    expect(parseInt(month, 10)).toBeLessThanOrEqual(12);
    expect(parseInt(day, 10)).toBeLessThanOrEqual(31);
  }
});

test('[DayJS Logic] weekOfYear test : (O)주차 number data 반환 검사', () => {
  expect(weekOfYear()).toBeLessThanOrEqual(53);
});
