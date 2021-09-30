import database from '@react-native-firebase/database';
import UsingFirebaseDB from '../UsingFirebaseDB';
import {MainRepository} from './MainRepository';

jest.mock('@react-native-firebase/auth', () => () => ({
  currentUser: {
    uid: 'mn4KAHT6GceKRLP3XeCFdeGHMRC2',
  },
}));

jest.mock('@react-native-firebase/database', () => () => {
  return {
    ref: jest.fn().mockReturnThis(),
    set: jest.fn().mockReturnThis(),
    orderByKey: jest.fn().mockReturnThis(),
    startAt: jest.fn().mockReturnThis(),
    endAt: jest.fn().mockReturnThis(),
    once: jest.fn(() => ({
      val: () => {
        return {
          '37': {
            '1630767600000': {
              '-MiZKsWoSTiZZ39Iim03': 1630809005162,
              '-MiZKtLUYMO7eHJvm7oY': 1630812605162,
            },
          },
        };
      },
    })),
  };
});

describe('[MainRepository Test]', () => {
  const {
    getHoliday,
    getUserName,
    getTimeOfTodayWork,
    setWorkTimeOfTodayToDB,
    pushWorkTimeOfTodayToDB,
    getWorkThisWeekInfo,
    getWorkTimeAverage,
  } = new MainRepository();

  test('[MainRepository Test] : getHoliday test', () => {
    const successGetDataFromDB = jest.spyOn(UsingFirebaseDB.prototype, 'getDataFromDB').mockImplementation(() =>
      Promise.resolve({
        HOLIDAY: ['2021-01-01'],
      }),
    );

    getHoliday().then(holidayData => {
      expect(holidayData).toEqual({
        HOLIDAY: ['2021-01-01'],
      });
    });

    expect(successGetDataFromDB).toBeCalledTimes(1);
  });

  test('[MainRepository Test] : getUserName test', () => {
    const successGetDataFromDB = jest
      .spyOn(UsingFirebaseDB.prototype, 'getDataFromDB')
      .mockImplementation(() => Promise.resolve('동우'));

    getUserName().then(holidayData => {
      expect(holidayData).toBe('동우');
    });

    expect(successGetDataFromDB).toBeCalledTimes(1);
  });

  test('[MainRepository Test] : getTimeOfTodayWork test', () => {
    const successGetDataFromDB = jest
      .spyOn(UsingFirebaseDB.prototype, 'getDataFromDB')
      .mockImplementation(() => Promise.resolve(['09:00 AM', '18:00 PM']));

    getTimeOfTodayWork().then(holidayData => {
      expect(holidayData).toEqual(['09:00 AM', '18:00 PM']);
    });

    expect(successGetDataFromDB).toBeCalledTimes(1);
  });

  test('[MainRepository Test] : setWorkTimeOfTodayToDB test', () => {
    const successSetDataToDB = jest
      .spyOn(UsingFirebaseDB.prototype, 'setDataToDB')
      .mockImplementation(() => Promise.resolve());

    setWorkTimeOfTodayToDB(1632754800000);

    expect(successSetDataToDB).toBeCalledTimes(1);
  });

  test('[MainRepository Test] : pushWorkTimeOfTodayToDB test', () => {
    const successPushDataToDB = jest
      .spyOn(UsingFirebaseDB.prototype, 'pushDataInDB')
      .mockImplementation(() => database().ref());
    const usingFirebaseServerValue = jest
      .spyOn(UsingFirebaseDB.prototype, 'usingServerTimeStamp')
      .mockReturnValue({'.sv': 'TIMESTAMP'});

    pushWorkTimeOfTodayToDB();

    expect(successPushDataToDB).toBeCalledTimes(1);
    expect(usingFirebaseServerValue).toBeCalledTimes(1);
  });

  test('[MainRepository Test] : getWorkThisWeekInfo test', () => {
    const successGetDataFromDB = jest.spyOn(UsingFirebaseDB.prototype, 'getDataFromDB').mockImplementation(() =>
      Promise.resolve([
        '32시간 03분',
        [
          {day: '2021-09-27', end: '2021-09-27 16:40:29', start: '2021-09-27 15:44:50'},
          {day: '2021-09-28', end: '2021-09-28 18:55:58', start: '2021-09-28 11:16:55'},
          {day: '2021-09-29', end: '2021-09-29 18:57:34', start: '2021-09-29 06:44:07'},
          {day: '2021-09-30', end: '2021-09-30 20:34:14', start: '2021-09-30 09:19:05'},
          {day: '2021-10-01', end: '', start: ''},
        ],
        115398780,
      ]),
    );

    getWorkThisWeekInfo().then(weekWorkData => {
      if (weekWorkData !== null) {
        const [weekWorkTimeHourMinute, weeklyWorkLog, weekWorkTime] = weekWorkData;
        expect(weekWorkTimeHourMinute).toBe('32시간 03분');
        expect(weeklyWorkLog[0]).toEqual({day: '2021-09-27', end: '2021-09-27 16:40:29', start: '2021-09-27 15:44:50'});
        expect(weekWorkTime).toBe(115398780);
      }
    });

    expect(successGetDataFromDB).toBeCalledTimes(1);
  });

  test('[MainRepository Test] : getWorkTimeAverage test', () => {
    getWorkTimeAverage('2021-09-01', '2021-09-30').then(workHour => {
      expect(workHour).toEqual(['1시간 00분', Math.round(3600000 / 10) * 10]);
    });
  });
});
