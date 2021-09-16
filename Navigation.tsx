import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeBaseProvider} from 'native-base';
import {SignInPresenter} from './app/presentation/components/signIn/SignInPresenter';
import {WorkLogPresenter} from './app/presentation/components/workLog/WorkLogPresenter';
import {MainPresenter} from './app/presentation/components/main/MainPresenter';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Stack.Navigator>
          <Stack.Screen name="SignIn" component={SignInPresenter} options={{headerShown: false}} />
          <Stack.Screen name="Main" component={MainPresenter} options={{headerShown: false}} />
          <Stack.Screen name="WorkLog" component={WorkLogPresenter} />
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};
