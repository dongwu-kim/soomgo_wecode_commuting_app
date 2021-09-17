import {UsingFirebaseDB} from '../UsingFirebaseDB';
import auth from '@react-native-firebase/auth';

export class SignInRepository extends UsingFirebaseDB {
  async getAccessUserEmailFromDB(): Promise<string[] | null> {
    try {
      const email: string[] = await super.getDataFromDB('/access/email', 'value', snapshot => {
        return [...snapshot.val()];
      });
      return email;
    } catch {
      return null;
    }
  }

  async setUserInfoToDB(value: any) {
    const uid = auth().currentUser?.uid;

    super.setDataToDB(`/${uid}/userInfo`, value);
  }
}
