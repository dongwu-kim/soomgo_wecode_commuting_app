import UsingFirebaseDB from './UsingFirebaseDB';
import database from '@react-native-firebase/database';

jest.mock('@react-native-firebase/database', () => () => {
  const snapshot = {val: () => ({data: 'data'})};
  return {
    ref: jest.fn((refDir = null) => {
      return {
        once: jest.fn(async () => {
          try {
            if (!refDir) {
              throw Error();
            }
            return snapshot;
          } catch {
            return {val: () => null};
          }
        }),

        set: jest.fn(value => {
          if (value) {
            return {refDir, value};
          } else {
            return null;
          }
        }),

        update: jest.fn(value => {
          if (value) {
            return {refDir, value};
          } else {
            return null;
          }
        }),

        push: jest.fn(value => {
          if (value) {
            return {refDir, value};
          } else {
            return null;
          }
        }),
      };
    }),
  };
});

describe('[UsingFirebaseDB Test] : METHOD', () => {
  const {getDataFromDB, setDataToDB, updateDataInDB, pushDataInDB} = new UsingFirebaseDB();

  test('[UsingFirebaseDB Test] : getDataFromDB test', async () => {
    const doesntHaveDirGetMethod = await getDataFromDB('', 'value', snapshot => {
      return snapshot.val();
    });

    const haveDirGetMethod = await getDataFromDB('/test', 'value', snapshot => {
      return snapshot.val();
    });

    expect(doesntHaveDirGetMethod).toBe(null);
    expect(doesntHaveDirGetMethod).not.toEqual({data: 'data'});
    expect(haveDirGetMethod).toEqual({data: 'data'});
  });

  test('[UsingFirebaseDB Test] : setDataToDB test', () => {
    expect(setDataToDB('/test', 'string data')).toEqual(database().ref('/test').set('string data'));
    expect(setDataToDB('/test', {data: 'data'})).not.toEqual(database().ref('/test').set('string data'));
    expect(setDataToDB('/dkanrudfh', 'string data')).not.toEqual(database().ref('/test').set('string data'));
  });

  test('[UsingFirebaseDB Test] : updateDataInDB test', () => {
    expect(updateDataInDB('/test', {data: 'data'})).toEqual(database().ref('/test').update({data: 'data'}));
    expect(updateDataInDB('/test', {data: 'data'})).not.toEqual(database().ref('/test').update({data: 12345}));
    expect(updateDataInDB('/dkanrudfh', {data: 'data'})).not.toEqual(database().ref('/test').update({data: 'data'}));
  });

  test('[UsingFirebaseDB Test] : pushDataInDB test', () => {
    expect(pushDataInDB('/test', 'string data')).toEqual(database().ref('/test').push('string data'));
    expect(pushDataInDB('/test', {data: 'data'})).not.toEqual(database().ref('/test').push('string data'));
    expect(pushDataInDB('/dkanrudfh', 'string data')).not.toEqual(database().ref('/test').push('string data'));
  });
});
