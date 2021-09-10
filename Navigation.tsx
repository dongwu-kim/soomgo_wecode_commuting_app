import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {App} from './app/view/App';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="App"
          component={App}
          options={{title: 'Commuting App'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
