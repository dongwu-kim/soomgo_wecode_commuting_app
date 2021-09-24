import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeBaseProvider} from 'native-base';
import {SignInPresenter} from './app/presentation/components/signIn/SignInPresenter';
import {WorkLogPresenter} from './app/presentation/components/workLog/WorkLogPresenter';
import {MainPresenter} from './app/presentation/components/main/MainPresenter';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Meeting} from './app/presentation/components/meeting/Meeting';
import {MyPage} from './app/presentation/components/myPage/MyPage';
import {DatePicker} from './app/presentation/components/DatePicker/DatePicker';
import {WorkTimeDetail} from './app/presentation/components/worktimedetail/WorkTimeDetail';

const Stack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackScreen = () => {
  return (
    <Stack.Navigator>
      <HomeStack.Screen name="Main" component={MainPresenter} options={{headerShown: false}} />
      <HomeStack.Screen name="WorkLog" component={WorkLogPresenter} />
      <HomeStack.Screen name="DatePicker" component={DatePicker} />
      <HomeStack.Screen name="WorkTimeDetail" component={WorkTimeDetail} />
    </Stack.Navigator>
  );
};

const MainTabScreen = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeStackScreen} options={{headerShown: false}} />
      <Tab.Screen name="Meeting" component={Meeting} options={{headerShown: false}} />
      <Tab.Screen name="MyPage" component={MyPage} options={{headerShown: false}} />
    </Tab.Navigator>
  );
};

export const Navigation = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Stack.Navigator>
          <Stack.Screen name="SignIn" component={SignInPresenter} options={{headerShown: false}} />
          <Stack.Screen name="Main" component={MainTabScreen} options={{headerShown: false}} />
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};
