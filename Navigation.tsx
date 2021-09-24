import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image, NativeBaseProvider} from 'native-base';
import {SignInPresenter} from './app/presentation/components/signIn/SignInPresenter';
import {WorkLogPresenter} from './app/presentation/components/workLog/WorkLogPresenter';
import {MainPresenter} from './app/presentation/components/main/MainPresenter';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Meeting} from './app/presentation/components/meeting/Meeting';
import {MyPage} from './app/presentation/components/myPage/MyPage';
import {DatePicker} from './app/presentation/components/DatePicker/DatePicker';
import {WorkTimeDetailPresenter} from './app/presentation/components/worktimedetail/WorkTimeDetailPresenter';
import {Maps} from './app/presentation/components/map/Maps';

const Stack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackScreen = () => {
  return (
    <Stack.Navigator>
      <HomeStack.Screen name="Main" component={MainPresenter} options={{headerShown: false}} />
      <HomeStack.Screen name="WorkLog" component={WorkLogPresenter} />
      <HomeStack.Screen name="DatePicker" component={DatePicker} />
      <HomeStack.Screen name="WorkTimeDetail" component={WorkTimeDetailPresenter} />
      <HomeStack.Screen name="Maps" component={Maps} />
    </Stack.Navigator>
  );
};

const MainTabScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#00c7ae',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({size}) => (
            <Image source={require('./data/images/home.png')} alt="home" w="50%" resizeMode="contain" size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Meeting"
        component={Meeting}
        options={{
          headerShown: false,
          tabBarIcon: ({size}) => (
            <Image source={require('./data/images/meeting.png')} alt="home" w="50%" resizeMode="contain" size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPage}
        options={{
          headerShown: false,
          tabBarIcon: ({size}) => (
            <Image source={require('./data/images/myPage.png')} alt="home" w="50%" resizeMode="contain" size={size} />
          ),
        }}
      />
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
