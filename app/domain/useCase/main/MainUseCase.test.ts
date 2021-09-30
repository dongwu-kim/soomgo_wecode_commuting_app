import MainUseCase from './MainUseCase';
import MainRepository from '../../../data/repository/main/MainRepository';

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
    once: jest.fn().mockReturnThis(),
  };
});

jest.mock('../../../config/config.js', () => ({
  GOOGLE_MAPS_API_KEY: 'API_KEY',
}));

describe('[MainUseCase Test]', () => {
  const {checkBusinessDay, checkHolidayInThisWeek, calcWeekWorkTimeProgress, calcDayWorkTimeProgress, getTodayWorkLog} =
    new MainUseCase();

  jest.spyOn(MainUseCase.prototype, 'reverseGeolocation').mockReturnValue(Promise.resolve('location string'));

  test('[MainUseCase Test] : checkBusinessDay test', () => {
    const getHoliday = jest
      .spyOn(MainRepository.prototype, 'getHoliday')
      .mockImplementation(() => Promise.resolve(['1996-12-24']));

    checkBusinessDay().then(isHoliday => expect(isHoliday).toBe(false));
    expect(getHoliday).toBeCalledTimes(1);
  });

  test('[MainUseCase Test] : checkHolidayInThisWeek test', () => {
    const getHoliday = jest
      .spyOn(MainRepository.prototype, 'getHoliday')
      .mockImplementation(() => Promise.resolve(['1996-12-24']));

    const workLogArr = [{day: '2021-09-27', end: '2021-09-27 16:40:29', start: '2021-09-27 15:44:50'}];

    checkHolidayInThisWeek(workLogArr).then(newWorkLog => {
      if (newWorkLog !== null) {
        expect(newWorkLog[0]).toEqual({
          day: '2021-09-27',
          end: '2021-09-27 16:40:29',
          start: '2021-09-27 15:44:50',
          holiday: false,
        });
      }
    });

    expect(getHoliday).toBeCalledTimes(1);
  });

  test('[MainUseCase Test] : calcWeekWorkTimeProgress test', () => {
    expect(calcWeekWorkTimeProgress(187200000)).toBe(100);
  });

  test('[MainUseCase Test] : calcDayWorkTimeProgress test', () => {
    expect(calcDayWorkTimeProgress(37440000)).toBe(100);
  });

  test('[MainUseCase Test] : getTodayWorkLog test', () => {
    const workLog = [
      {
        day: '2021-09-27',
        end: '2021-09-27 16:40:29',
        start: '2021-09-27 15:44:50',
        holiday: false,
      },
    ];
    expect(getTodayWorkLog(workLog)).toEqual({});
  });
});
