import database, {FirebaseDatabaseTypes} from '@react-native-firebase/database';

type EventType = FirebaseDatabaseTypes.EventType;
type DataSnapshot = FirebaseDatabaseTypes.DataSnapshot;

export class UsingFirebaseDB {
  getDataFromDB(
    firebaseDBPath: string,
    eventType: EventType,
    successCallback: (a: DataSnapshot, b?: string | null) => any,
  ) {
    return database().ref(firebaseDBPath).once(eventType).then(successCallback);
  }

  setDataToDB(firebaseDBPath: string, value: any) {
    return database().ref(firebaseDBPath).set(value);
  }

  updateDataInDB(firebaseDBPath: string, value: any) {
    return database().ref(firebaseDBPath).update(value);
  }

  pushDataInDB(firebaseDBPath: string, value: any) {
    return database().ref(firebaseDBPath).push(value);
  }
}
