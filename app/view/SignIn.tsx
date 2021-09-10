import React from 'react';
import {StyleSheet} from 'react-native';
import {Image, VStack} from 'native-base';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';

export const SignIn = ({navigation}) => {
  const {googleButton} = style;
  const {navigate} = navigation;
  return (
    <VStack flex={1} bg="white" justifyContent="center" alignItems="center">
      <Image
        source={require('../../data/images/soomgo_logo_rgb.png')}
        alt="Logo"
        w="70%"
        resizeMode="contain"
        marginBottom={75}
      />
      <GoogleSigninButton
        style={googleButton}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={() => {}}
      />
    </VStack>
  );
};

const style = StyleSheet.create({
  googleButton: {
    position: 'absolute',
    bottom: 90,
  },
});
