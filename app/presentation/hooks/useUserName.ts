import {useState, useEffect} from 'react';
import {MainUseCase} from '../../domain/useCase/main/MainUseCase';

const {getUserName} = new MainUseCase();

export const useUserName = (): [string | null, true | false] => {
  const [userName, setUserName] = useState<string | null>('');
  const [userNameLoading, setUserNameLoading] = useState<true | false>(true);

  useEffect(() => {
    getUserName().then(userNameFromDB => {
      setUserName(userNameFromDB);
      setUserNameLoading(false);
    });
  }, []);

  return [userName, userNameLoading];
};
