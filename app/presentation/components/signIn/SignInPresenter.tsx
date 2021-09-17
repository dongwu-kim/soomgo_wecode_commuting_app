import React, {useEffect, useState} from 'react';
import {SignInUseCase} from '../../../domain/useCase/signIn/SignInUseCase';
import {useAccessUserEmail} from '../../hooks/useAccessUserEmail';
import {ISignInUser} from '../../interface/ISignIn';

import {SignIn} from './SignIn';

const signInLogic = new SignInUseCase();
const {signInValidation, signInGoogleAuth} = signInLogic;

const handleSocialSignIn = (setSignInUserInfo: React.Dispatch<React.SetStateAction<ISignInUser | null>>): void => {
  signInGoogleAuth().then(userInfoWithoutToken => {
    setSignInUserInfo(userInfoWithoutToken);
  });
};

export const SignInPresenter = ({navigation}: any) => {
  const {navigate} = navigation;

  const [accessUserEmail, accessUserLoading] = useAccessUserEmail();
  const [signInUserInfo, setSignInUserInfo] = useState<ISignInUser | null>(null);

  useEffect(() => {
    if (!accessUserLoading) {
      if (signInUserInfo?.email) {
        if (signInValidation(signInUserInfo.email, accessUserEmail)) {
          navigate('Main');
        }
      }
    }
  }, [accessUserEmail, signInUserInfo]);

  return (
    <SignIn
      handleSocialSignIn={() => {
        handleSocialSignIn(setSignInUserInfo);
      }}
    />
  );
};
