import {UsingFirebaseDB} from './UsingFirebaseDB';

export class SignInRepository extends UsingFirebaseDB {
  async getAccessUserEmailFromDB(): Promise<string[] | null> {
    try {
      const email: string[] = await super.getDataFromDB(
        '/access/email',
        'value',
        snapshot => {
          console.log(snapshot.val());
          return [...snapshot.val()];
        },
      );
      return email;
    } catch {
      return null;
    }
  }
}
