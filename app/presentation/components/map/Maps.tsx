import {Text} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import MapView, {Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE} from 'react-native-maps';
import {IMapLocation} from '../../interface/IMapLocation';

export const Maps = ({route}: any) => {
  const {params} = route;
  const {locationCode} = params;
  const {latitude, longitude} = locationCode;
  const [coordinates, setCoordinates] = useState<IMapLocation | null>(null);

  useEffect(() => {
    setCoordinates({
      latitude,
      longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.002,
    });
  }, []);

  return (
    <SafeAreaView>
      {coordinates !== null ? (
        <MapView style={style.map} provider={PROVIDER_GOOGLE} region={coordinates}>
          <Marker
            title="숨고"
            flat={true}
            pinColor="#00c7ae"
            coordinate={{latitude: 37.505969, longitude: 127.05186}}
          />
        </MapView>
      ) : (
        <Text>일시적인 오류로 인해 Map을 표시할 수 없습니다.</Text>
      )}
    </SafeAreaView>
  );
};

export const style = StyleSheet.create({
  map: {
    height: '100%',
  },
});
