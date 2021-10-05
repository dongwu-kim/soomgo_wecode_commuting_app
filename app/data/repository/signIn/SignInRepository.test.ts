import {SignInRepository} from './SignInRepository';
import UsingFirebaseDB from '../UsingFirebaseDB';

jest.mock('@react-native-firebase/auth', () => () => ({
  currentUser: {
    uid: 'mn4KAHT6GceKRLP3XeCFdeGHMRC2',
  },
}));

jest.mock('@react-native-firebase/database', () => () => ({
  ref: jest.fn(refDir => ({
    once: jest.fn(async () => ({
      val: () => {
        return ['email@email.com'];
      },
    })),
    set: jest.fn(value => {
      return {refDir, value};
    }),
  })),
}));

describe('[SignInRepository Test]', () => {
  const {getAccessUserEmailFromDB, setUserInfoToDB} = new SignInRepository();

  test('[SignInRepository Test] : getAccessUserEmailFromDB test', async () => {
    return getAccessUserEmailFromDB().then(accessEmailArray => {
      expect(accessEmailArray).toEqual(['email@email.com']);
    });
  });

  test('[SignInRepository Test] : setUserInfoToDB test', () => {
    const setDBMethodCall = jest.spyOn(UsingFirebaseDB.prototype, 'setDataToDB').mockImplementation(async () => {});
    setUserInfoToDB({userInfo: 'userInfo'});
    expect(setDBMethodCall).toBeCalledTimes(1);
  });
});
