import {CLIENT_ID} from '../../../env.json';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const GoogleSocialAuth = () => {
  GoogleSignin.configure({
    webClientId: CLIENT_ID,
  });
  async function onGoogleButtonPress() {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  }
  return onGoogleButtonPress();
};

export default GoogleSocialAuth;
