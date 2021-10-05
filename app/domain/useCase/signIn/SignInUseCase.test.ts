import {SignInUseCase} from './SignInUseCase';
import auth from '@react-native-firebase/auth';

jest.mock('../../../config/config.js', () => ({
  FIREBASE_CLIENT_ID: 'string data',
  GOOGLE_MAPS_API_KEY: 'string data',
}));

jest.mock('react-native', () => () => ({
  Alert: jest.fn().mockReturnThis(),
  alert: jest.fn(),
}));

jest.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: {
    configure: jest.fn(),
    signIn: jest.fn().mockImplementation(() =>
      Promise.resolve({
        idToken: 'token String data',
        user: {
          id: 'asjdknsakldmlksadm',
          name: '김동우',
          email: 'kink7797@gmail.com',
          photo: 'image URL',
          familyName: '김',
          givenName: '동우',
        },
      }),
    ),
  },
  statusCodes: {
    SIGN_IN_CANCELLED: 'cancle message',
    IN_PROGRESS: 'progress message',
    PLAY_SERVICES_NOT_AVAILABLE: 'service not allowed message',
  },
}));

jest.mock('@react-native-firebase/auth', () => () => ({
  signInWithCredential: jest.fn().mockImplementation(() => Promise.resolve(true)),
}));

jest.mock('@react-native-firebase/database', () => () => ({}));

describe('[SignInUseCase Test]', () => {
  const {signInGoogleAuth, signInValidation} = new SignInUseCase();
  test('[SignInUseCase Test] : signInGoogleAuth test', async () => {
    auth.GoogleAuthProvider = {
      PROVIDER_ID: 'string data',
      credential: jest.fn().mockImplementation(() => Promise.resolve(true)),
    };
    return signInGoogleAuth().then(user => {
      expect(user).toEqual({
        id: 'asjdknsakldmlksadm',
        name: '김동우',
        email: 'kink7797@gmail.com',
        photo: 'image URL',
        familyName: '김',
        givenName: '동우',
      });
    });
  });
  test('[SignInUseCase Test] : signInValidation test', () => {
    const accessUserEmail = ['kimk7797@gmail.com'];
    const userEmail = 'kimk7797@gmail.com';

    expect(signInValidation(userEmail, accessUserEmail)).toBe(true);
    expect(signInValidation('kimdongwu7797@gmail.com', accessUserEmail)).toBe(false);
  });
});
