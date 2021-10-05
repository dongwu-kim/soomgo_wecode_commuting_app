import {WorkLogRepository} from './WorkLogRepository';

jest.mock('@react-native-firebase/auth', () => () => ({
  currentUser: {
    uid: 'mn4KAHT6GceKRLP3XeCFdeGHMRC2',
  },
}));

jest.mock('@react-native-firebase/database', () => () => {
  return {
    ref: jest.fn().mockReturnThis(),
    set: jest.fn().mockReturnThis(),
    once: jest.fn(async () => {
      const snapshot = {
        val: () => ({
          workLog: '에헤라디야',
        }),
      };
      return snapshot;
    }),
  };
});

describe('[WorkLogRepository Test]', () => {
  const {getYesterdayWorkLog, getTodayWorkLog, getLastWeekWorkLog, setWorkLogInDB} = new WorkLogRepository();

  test('[WorkLogRepository] : getYesterdayWorkLog test', async () => {
    return getYesterdayWorkLog().then(yesterDayWorkLog => {
      if (yesterDayWorkLog !== null) {
        const {workLog} = yesterDayWorkLog;
        expect(workLog).toBe('에헤라디야');
      } else {
        expect(yesterDayWorkLog).toBe(null);
        expect(yesterDayWorkLog).not.toBe(undefined);
      }
    });
  });

  test('[WorkLogRepository] : getTodayWorkLog test', async () => {
    return getTodayWorkLog().then(todayWorkLog => {
      if (todayWorkLog !== null) {
        const {workLog} = todayWorkLog;
        expect(workLog).toBe('에헤라디야');
      } else {
        expect(todayWorkLog).toBe(null);
        expect(todayWorkLog).not.toBe(undefined);
      }
    });
  });

  test('[WorkLogRepository] : getLastWeekWorkLog test', async () => {
    return getLastWeekWorkLog().then(lastWeekWorkLog => {
      if (lastWeekWorkLog !== null) {
        const {workLog} = lastWeekWorkLog;
        expect(workLog).toBe('에헤라디야');
      } else {
        expect(lastWeekWorkLog).toBe(null);
        expect(lastWeekWorkLog).not.toBe(undefined);
      }
    });
  });

  test('[WorkLogRepository] : setWorkLogInDB test', () => {
    return setWorkLogInDB('가나다라마바사아자차카타파하', '가나다라마바사아자차카타파하').then(success => {
      if (success) {
        expect(success).toBe(true);
      } else {
        expect(success).toBe(false);
      }
    });
  });
});
