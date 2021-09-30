import * as dayjsUtil from './dayjs';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.locale('ko');
dayjs.extend(utc);

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeWithinRange(a: number, b: number): R;
    }
  }
}

expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () => `${received}가 ${floor} - ${ceiling} 범위 내에 있습니다.`,
        pass: true,
      };
    } else {
      return {
        message: () => `${received}가 ${floor} - ${ceiling} 범위 내에 없습니다.`,
        pass: false,
      };
    }
  },
});

describe('[DayJs Logic Test]', () => {
  const NOW_YEAR_NUM: number = 2021;

  const checkUTC = () => {
    if (dayjs().local().format().includes('T00')) {
      return Boolean(true);
    } else {
      return Boolean(false);
    }
  };

  test('[DayJS Logic] dayjsNow test : 현재 시각 string을 범위 내에서 반환하는가?', () => {
    const [yearMonthString, time] = dayjsUtil.dayjsNow().split(' ');
    const [year, month, day] = yearMonthString.split('-');
    const [hour, minute, sec] = time.split(':');

    expect(parseInt(year, 10)).toBe(NOW_YEAR_NUM);
    expect(parseInt(month, 10)).toBeWithinRange(1, 12);
    expect(parseInt(day, 10)).toBeWithinRange(1, 31);
    expect(parseInt(hour, 10)).toBeWithinRange(0, 23);
    expect(parseInt(minute, 10)).toBeWithinRange(0, 59);
    expect(parseInt(sec, 10)).toBeWithinRange(0, 59);
  });

  test('[DayJS Logic] nowYear test : year number를 반환하는가?', () => {
    expect(dayjsUtil.nowYear()).toBe(NOW_YEAR_NUM);
  });

  test('[DayJS Logic] nowMonth test : month number를 반환하는가?', () => {
    expect(dayjsUtil.nowMonth()).toBeWithinRange(1, 12);
  });

  test('[DayJS Logic] nowDate test : day number를 반환하는가?', () => {
    expect(dayjsUtil.nowDate()).toBeWithinRange(1, 31);
  });

  test('[DayJS Logic] nowTime test : 현재 시각(HH:mm:ss) string을 범위 내에서 반환하는가?', () => {
    const [hour, minute, sec] = dayjsUtil.nowTime().split(':');

    expect(parseInt(hour, 10)).toBeWithinRange(0, 23);
    expect(parseInt(minute, 10)).toBeWithinRange(0, 59);
    expect(parseInt(sec, 10)).toBeWithinRange(0, 59);
  });

  test('[DayJS Logic] nowDateArray test : 배열 내 현재 yearMonth data를 포함하고 있는가?', () => {
    const yearMonthArr = dayjsUtil.nowDateArray();
    const [year, month, day] = yearMonthArr;
    expect(yearMonthArr).toHaveLength(3);
    expect(year).toBe(NOW_YEAR_NUM);
    expect(month).toBeWithinRange(1, 12);
    expect(day).toBeWithinRange(1, 31);
  });

  test('[DayJS Logic] nowMilliSec test : milliSec 자리수(13) 검사', () => {
    expect(dayjsUtil.nowMilliSec().toString().length).toBe(13);
  });

  test('[DayJS Logic] todayYearMonthDate test : 현재 년, 월, 일 string data 검사', () => {
    const [year, month, day] = dayjsUtil.todayYearMonthDate().split('-');
    expect(parseInt(year, 10)).toBe(NOW_YEAR_NUM);
    expect(parseInt(month, 10)).toBeWithinRange(1, 12);
    expect(parseInt(day, 10)).toBeWithinRange(1, 31);
  });

  test('[DayJS Logic] dayOfWeekValue test : (I) yearMonth string (O) dayNum(0-6) 반환 검사', () => {
    expect(dayjsUtil.dayOfWeekValue('2021-09-28')).toBe(2);
  });

  test('[DayJS Logic] dayOfWeek test : (I) yearMonth string | milliSec (O) 요일 string 반환 검사', () => {
    expect(dayjsUtil.dayOfWeek('2021-09-28')).toMatch(/(월|화|수|목|금|토|일)/);
    expect(dayjsUtil.dayOfWeek(1632754800000)).toMatch(/(월|화|수|목|금|토|일)/);
  });

  test('[DayJS Logic] dayOfWeekDate test : (I)dayNum(0-6) (O) yearMonth string 반환 검사', () => {
    for (let i = 0; i <= 6; i++) {
      const [year, month, day] = dayjsUtil.dayOfWeekDate(i).split('-');
      expect(parseInt(year, 10)).toBe(NOW_YEAR_NUM);
      expect(parseInt(month, 10)).toBeWithinRange(1, 12);
      expect(parseInt(day, 10)).toBeWithinRange(1, 31);
    }
  });

  test('[DayJS Logic] weekOfYear test : (O) 주차 number data 반환 검사', () => {
    expect(dayjsUtil.weekOfYear()).toBeWithinRange(1, 53);
  });

  test('[DayJS Logic] calcWeekOfYear test : (I) dayString or timeStamp (O) 주차 number data 반환 검사', () => {
    expect(dayjsUtil.calcWeekOfYear('2021-09-28')).toBe(40);
    expect(dayjsUtil.calcWeekOfYear(1632754800000)).toBe(40);
  });

  test('[DayJS Logic] workTime test : (I) timeString or timeStamp (O) 주차 timeFormat 반환 검사', () => {
    if (checkUTC()) {
      expect(dayjsUtil.workTime(1632822958649)).toBe('09:55 AM');
      expect(dayjsUtil.workTime('2021-09-11 09:44')).toBe('09:44 AM');
    }
    expect(dayjsUtil.workTime(1632822958649)).toBe(dayjs(1632822958649).format('HH:mm A'));
    expect(dayjsUtil.workTime('2021-09-11 09:44')).toBe('09:44 AM');
  });

  test('[DayJS Logic] hourMinuteTime test : (I) timeString(HH:mm:ss) (O) HH:mm format', () => {
    expect(dayjsUtil.hourMinuteTime('2021-09-29 18:55:55')).toBe('18:55');
  });

  test('[DayJS Logic] todayMilliSec test : (O)오늘 날짜(YYYY-MM-DD)의 timeStamp(~00000)', () => {
    const milliSecCheck = dayjsUtil.todayMilliSec().toString().slice(-5);
    expect(milliSecCheck).toBe('00000');
  });

  test('[DayJS Logic] yearMonthDate test : (I) dateString(string|number) (O) 해당 Input의 yearMonth string', () => {
    if (checkUTC()) {
      expect(dayjsUtil.yearMonthDate(1632754800000)).toBe('2021-09-27');
    }
    expect(dayjsUtil.yearMonthDate('2021-09-28 13:00:00')).toBe('2021-09-28');
    expect(dayjsUtil.yearMonthDate(1632754800000)).toBe(dayjs(1632754800000).format('YYYY-MM-DD'));
  });

  test('[DayJS Logic] startDayNowMonth test : (O)현재 month의 1st day yearMonth string 반환 검사', () => {
    const [year, month, day] = dayjsUtil.startDayNowMonth().split('-');
    expect(parseInt(year, 10)).toBe(NOW_YEAR_NUM);
    expect(parseInt(month, 10)).toBeWithinRange(1, 12);
    expect(parseInt(day, 10)).toBeWithinRange(1, 31);
  });

  test('[DayJS Logic] endDayNowMonth test : (O)현재 month의 last day yearMonth string 반환 검사', () => {
    const [year, month, day] = dayjsUtil.endDayNowMonth().split('-');
    expect(parseInt(year, 10)).toBe(NOW_YEAR_NUM);
    expect(parseInt(month, 10)).toBeWithinRange(1, 12);
    expect(parseInt(day, 10)).toBeWithinRange(1, 31);
  });

  test('[DayJS Logic] timeLag test : (I) 두 날짜 dayString(YYYY-MM-DD HH:mm:ss) (O) 시간차(HH:mm:ss)', () => {
    expect(dayjsUtil.timeLag('2021-09-28 13:00:00', '2021-09-29 02:00:00')).toBe('13:00:00');
  });

  test('[DayJS Logic] parseMilliSecToYearMonth test : (I) milliSec num (O) yearMonth string(YYYY-MM-DD)', () => {
    if (checkUTC()) {
      expect(dayjsUtil.parseMilliSecToYearMonth(1632754800000)).toBe('2021-09-27');
    }
    expect(dayjsUtil.parseMilliSecToYearMonth(1632754800000)).toBe(dayjs(1632754800000).format('YYYY-MM-DD'));
  });

  test('[DayJS Logic] parseMilliSecToTime test : (I) milliSec num (O) time string(YYYY-MM-DD HH:mm:ss)', () => {
    if (checkUTC()) {
      expect(dayjsUtil.parseMilliSecToTime(1632754800000)).toBe('2021-09-27 15:00:00');
    }
    expect(dayjsUtil.parseMilliSecToTime(1632754800000)).toBe(dayjs(1632754800000).format('YYYY-MM-DD HH:mm:ss'));
  });

  test('[DayJS Logic] stringToMilliSec test : (I) date string (O) milliSec', () => {
    if (checkUTC()) {
      expect(dayjsUtil.stringToMilliSec('2021-09-28 00:00:00')).toBe(1632754800000);
    }
    expect(dayjsUtil.stringToMilliSec('2021-09-28 00:00:00')).toBe(dayjs('2021-09-28 00:00:00').valueOf());
  });

  test('[DayJS Logic] calcMiliSecTimeHourMinuteString test : (I) milliSec (O) "HH:mm:ss"', () => {
    expect(dayjsUtil.calcMiliSecTime(1000)).toBe('0:00:01');
  });

  test('[DayJS Logic] calcMiliSecTimeHourMinuteString test : (I) milliSec (O) "~시간 ~분"', () => {
    expect(dayjsUtil.calcMiliSecTimeHourMinuteString(60000)).toBe('0시간 01분');
  });

  test('[DayJS Logic] milliSecondsNumLag test : (I) (start, end) milliSecNum (O) HH:mm:ss string', () => {
    expect(dayjsUtil.milliSecondsNumLag(0, 1000)).toBe('0:00:01');
    expect(dayjsUtil.milliSecondsNumLag(1000, 0)).toBe('0:00:00');
  });
});
