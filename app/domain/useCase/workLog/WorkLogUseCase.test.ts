import {WorkLogRepository} from '../../../data/repository/workLog/WorkLogRepository';
import {WorkLogUseCase} from './WorkLogUseCase';

jest.mock('@react-native-firebase/database', () => () => ({}));
jest.mock('@react-native-firebase/auth', () => () => ({}));
jest.mock('../../../utils/dayjs.ts', () => ({
  todayOfWeek: jest.fn().mockReturnValue(1),
}));

describe('[WorkLogUseCase Test]', () => {
  const {buttonDisableTest, saveWorkLog, loadBothWorkLog} = new WorkLogUseCase();

  test('[WorkLogUseCase Test] : buttonDisableTest test', () => {
    expect(buttonDisableTest(1, 20)).toBe(Boolean(false));
    expect(buttonDisableTest(20, 21)).toBe(Boolean(true));
    expect(buttonDisableTest(20, 301)).toBe(Boolean(false));
    expect(buttonDisableTest(301, 301)).toBe(Boolean(false));
  });

  test('[WorkLogUseCase Test] : saveWorkLog test', () => {
    const setWorkLogCall = jest
      .spyOn(WorkLogRepository.prototype, 'setWorkLogInDB')
      .mockImplementation(() => Promise.resolve(true));

    expect(saveWorkLog('짧은 문자열 test', '짧은 문자열 test')).toBe(undefined);
    expect(saveWorkLog('', '공백 문자열 test')).toBe(undefined);

    saveWorkLog('20자 이상의 text, 20자 이상 문자열 test', '300자 이하의 text, 300자 이하 문자열 test');
    expect(setWorkLogCall).toBeCalledTimes(1);
  });

  test('[WorkLogUseCase Test] : loadBothWorkLog test', async () => {
    const getLastWeekWorkLog = jest
      .spyOn(WorkLogRepository.prototype, 'getLastWeekWorkLog')
      .mockImplementation(() => Promise.resolve({workLog: '지난주 workLog string data'}));

    const getYesterdayWorkLog = jest
      .spyOn(WorkLogRepository.prototype, 'getYesterdayWorkLog')
      .mockImplementation(() => Promise.resolve({workLog: '전일 workLog string data'}));

    const getTodayWorkLog = jest
      .spyOn(WorkLogRepository.prototype, 'getTodayWorkLog')
      .mockImplementation(() => Promise.resolve({workLog: '당일 workLog string data'}));

    return loadBothWorkLog().then(workLogData => {
      expect(workLogData).toEqual(['지난주 workLog string data', '당일 workLog string data']);
      expect(getLastWeekWorkLog).toBeCalledTimes(1);
      expect(getYesterdayWorkLog).toBeCalledTimes(0);
      expect(getTodayWorkLog).toBeCalledTimes(1);
    });
  });
});
