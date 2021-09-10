import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeBaseProvider} from 'native-base';

import {SignIn} from './app/view/SignIn';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Stack.Navigator>
<<<<<<< HEAD
=======
<<<<<<< HEAD
          <Stack.Screen name="SignIn" component={SignIn} />
=======
>>>>>>> 205671b ([ADD] : 구글  소셜 로그인 추가)
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{headerShown: false}}
          />
<<<<<<< HEAD
=======
>>>>>>> fb33f48 ([ADD] : signIn layout)
>>>>>>> 205671b ([ADD] : 구글  소셜 로그인 추가)
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};
