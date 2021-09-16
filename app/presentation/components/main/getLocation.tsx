import Geolocation from '@react-native-community/geolocation';
import React, {useEffect, useState} from 'react';
import {Button, Text, SafeAreaView, Alert} from 'react-native';
import {MAPS_API_KEY} from '../../../../env.json';

const GetLocation = () => {
  const [location, setLocation] = useState<number>(0);
  const [address, setAddress] = useState<string>('');

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({
          latitude,
          longitude,
        });
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
    );
    Geolocation.watchPosition(position => {
      const {latitude, longitude} = position.coords;
      setLocation({latitude, longitude});
    });
  }, []);

  const response = () => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&language=ko&key=${MAPS_API_KEY}`,
    )
      .then(results => results.json())
      .then(res => {
        const addressArr = res.results[0].formatted_address.split(' ');
        const locationAddress = `${addressArr[2]} ${addressArr[3]}`;
        setAddress(locationAddress);
      });
  };

  return (
    <SafeAreaView>
      <Text>{address}</Text>
      <Text>{location.latitude}</Text>
      <Text>{location.longitude}</Text>
      <Button
        title="button"
        onPress={() => {
          response();
        }}
      />
    </SafeAreaView>
  );
};

export default GetLocation;
