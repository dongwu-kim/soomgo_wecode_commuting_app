import React from 'react';
import {NativeBaseProvider, Box} from 'native-base';

export const App = () => {
  return (
    <NativeBaseProvider>
      <Box>Hello world</Box>
    </NativeBaseProvider>
  );
};
