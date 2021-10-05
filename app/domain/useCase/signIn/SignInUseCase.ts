import auth from '@react-native-firebase/auth';
import {GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin';
import {SignInRepository} from '../../../data/repository/signIn/SignInRepository';
import {ISignInUser} from '../../../presentation/interface/ISignIn';
import {FIREBASE_CLIENT_ID} from '../../../config/config';

export class SignInUseCase extends SignInRepository {
  async signInGoogleAuth(): Promise<ISignInUser | null> {
    GoogleSignin.configure({
      webClientId: FIREBASE_CLIENT_ID,
    });

    try {
      const userInfo = await GoogleSignin.signIn();
      const {idToken, user} = userInfo;
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      return user;
    } catch (e: any) {
      if (e.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('유저가 로그인 취소');
      } else if (e.code === statusCodes.IN_PROGRESS) {
        console.log('로그인 진행 중');
      } else if (e.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('플레이 서비스를 사용할 수 없음');
      } else {
        console.log('그외 에러');
      }
      return null;
    }
  }

  signInValidation(email: string, accessUserEmail: string[] | null): Boolean {
    if (accessUserEmail?.includes(email)) {
      return true;
    } else {
      return false;
    }
  }
}
