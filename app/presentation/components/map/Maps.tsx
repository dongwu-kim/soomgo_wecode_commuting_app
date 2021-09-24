import React, {useState} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import MapView, {Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE} from 'react-native-maps';

export const Maps = () => {
  const [coordinates, setCoordinates] = useState({
    latitude: 37.505969,
    longitude: 127.05186,
    latitudeDelta: 0.005,
    longitudeDelta: 0.002,
  });
  return (
    <SafeAreaView>
      <MapView style={style.map} provider={PROVIDER_GOOGLE} region={coordinates}>
        <Marker title="숨고" flat={true} pinColor="#00c7ae" coordinate={{latitude: 37.505969, longitude: 127.05186}} />
      </MapView>
    </SafeAreaView>
  );
};

export const style = StyleSheet.create({
  map: {
    height: '100%',
  },
});
