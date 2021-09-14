import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeBaseProvider} from 'native-base';
import {SignInPresenter} from './app/presentation/components/signIn/SignInPresenter';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={SignInPresenter}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};
