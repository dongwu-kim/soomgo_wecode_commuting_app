import {WorkTimeDetailRepository} from './WorkTimeDetailRepository';

jest.mock('@react-native-firebase/auth', () => () => ({
  currentUser: {
    uid: 'mn4KAHT6GceKRLP3XeCFdeGHMRC2',
  },
}));

jest.mock('@react-native-firebase/database', () => () => {
  const snapshot = {
    val: () => ({
      val: () => ({
        '37': {
          '1630767600000': {
            '-MiZKsWoSTiZZ39Iim03': 1630809005162,
            '-MiZKtLUYMO7eHJvm7oY': 1630809008545,
          },
        },
      }),
    }),
  };

  return {
    ref: jest.fn().mockReturnThis(),
    on: jest.fn().mockReturnThis(),
    push: jest.fn().mockReturnThis(),
    set: jest.fn().mockReturnThis(),
    orderByKey: jest.fn().mockReturnThis(),
    startAt: jest.fn().mockReturnThis(),
    endAt: jest.fn().mockReturnThis(),
    once: jest.fn((event, callback) => callback(snapshot)),
  };
});

describe('[WorkTimeDetailRepository] TEST', () => {
  const {getWorkTimeDetailLog} = new WorkTimeDetailRepository();

  test('[WorkTimeDetailRepository] getWorkTimeSetailLog logic test', async () => {
    getWorkTimeDetailLog('2021-09-05', '2021-09-05').then(workLogData => {
      if (workLogData) {
        expect(workLogData[0]).toEqual({
          id: '1630767600000start',
          date: '2021-09-05',
          timeStamp: '11:30 AM',
          recentText: '출근',
        });
        expect(workLogData[1]).toEqual({
          id: '1630767600000end',
          date: '2021-09-05',
          timeStamp: '11:30 AM',
          recentText: '퇴근',
        });
      } else {
        expect(workLogData).toBe(null);
        expect(workLogData).not.toBe(undefined);
      }
    });
  });
});
