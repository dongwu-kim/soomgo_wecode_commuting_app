import React from 'react';
import {StyleSheet} from 'react-native';
import {Image, VStack} from 'native-base';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {ISignInProps} from '../../interface/ISignIn';

export const SignIn = ({handleSocialSignIn}: ISignInProps) => {
  const {googleButton} = style;

  return (
    <VStack flex={1} bg="white" justifyContent="center" alignItems="center">
      <Image
        source={require('../../../../data/images/soomgo_logo_rgb.png')}
        alt="Logo"
        w="50%"
        resizeMode="contain"
        marginBottom={75}
      />
      <GoogleSigninButton
        style={googleButton}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={handleSocialSignIn}
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
