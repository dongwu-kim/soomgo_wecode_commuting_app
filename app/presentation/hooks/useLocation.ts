import {useEffect, useState} from 'react';
import {MainUseCase} from '../../domain/useCase/main/MainUseCase';
import {ILocation} from '../interface/IGeolocation';

import Geolocation from '@react-native-community/geolocation';
import {Alert} from 'react-native';

const mainLogic = new MainUseCase();
const {reverseGeolocation} = mainLogic;

export const useLocation = () => {
  const [location, setLocation] = useState<ILocation | null>(null);
  const [address, setAddress] = useState<string>('');

  useEffect(() => {
    if (location === null) {
      Geolocation.watchPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setLocation({latitude, longitude});
        },
        error => {
          if (error.code === 1) {
            Alert.alert('위치확인 승인이 필요합니다');
          } else if (error.code === 2) {
            Alert.alert('위치확인을 사용할 수 없습니다.');
          } else {
            Alert.alert('시간이 초과되었습니다.');
          }
          console.log(error.code, error.message);
        },
        {
          timeout: 10,
        },
      );
    } else {
      reverseGeolocation(location).then(locationAddress => {
        setAddress(locationAddress);
      });
    }
  }, [location, address]);

  return [address];
};
