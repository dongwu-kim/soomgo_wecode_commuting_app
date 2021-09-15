import {UsingFirebaseDB} from './UsingFirebaseDB';

export class SignInRepository extends UsingFirebaseDB {
  async getAccessUserEmailFromDB(): Promise<string[] | null> {
    try {
      const email: string[] = await super.getDataFromDB(
        '/access/email',
        'value',
        snapshot => {
          return [...snapshot.val()];
        },
      );
      return email;
    } catch {
      return null;
    }
  }
}
