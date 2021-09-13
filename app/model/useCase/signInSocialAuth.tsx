import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {CLIENT_ID} from '../../../env.json';
import {Alert} from 'react-native';

export const signInSocialAuth = async () => {
  GoogleSignin.configure({
    webClientId: CLIENT_ID,
  });

  try {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    await auth().signInWithCredential(googleCredential);
    Alert.alert('로그인 성공');
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('유저가 로그인 취소');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('로그인 진행 중');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('플레이 서비스를 사용할 수 없음');
    } else {
      console.log('그외 에러');
    }
    Alert.alert('다시 로그인 해주세요');
  }
};
