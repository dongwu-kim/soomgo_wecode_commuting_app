import {useState, useEffect} from 'react';
import {SignInUseCase} from '../../domain/useCase/signIn/SignInUseCase';

const signInLogic = new SignInUseCase();
const {getAccessUserEmailFromDB} = signInLogic;

export const useAccessUserEmail = (): [string[] | null, Boolean] => {
  const [accessUserEmail, setAccessUserEmail] = useState<string[] | null>(null);
  const [accessUserLoading, setAccessUserLoading] = useState<Boolean>(true);
  useEffect(() => {
    if (accessUserEmail === null) {
      getAccessUserEmailFromDB().then(emails => {
        if (emails !== null) {
          setAccessUserEmail(emails);
          setAccessUserLoading(false);
        }
      });
    }
  }, []);

  return [accessUserEmail, accessUserLoading];
};
