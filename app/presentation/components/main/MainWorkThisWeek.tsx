import {Box, Center, Progress, VStack} from 'native-base';
import React from 'react';
import {Text} from 'react-native-svg';

export const MainWorkThisWeek = () => {
  return (
    <>
      <Box w="90%" my={5}>
        <Text fontSize={'2xl'}>이번주 근무 </Text>
      </Box>
      <VStack w="90%" borderWidth={1} alignItems="center">
        <Box flexDirection="row">
          <Box w="20%" borderWidth={1}>
            <Center borderBottomWidth={1} _text={{fontSize: 'xs'}}>
              10:38 ~ 18:32
            </Center>
            <Center>월</Center>
          </Box>
          <Box w="20%" borderWidth={1}>
            <Center borderBottomWidth={1} _text={{fontSize: 'xs'}}>
              10:38 ~ 18:32
            </Center>
            <Center>화</Center>
          </Box>
          <Box w="20%" borderWidth={1}>
            <Center borderBottomWidth={1} _text={{fontSize: 'xs'}}>
              10:38 ~ 18:32
            </Center>
            <Center>수</Center>
          </Box>
          <Box w="20%" borderWidth={1}>
            <Center borderBottomWidth={1} _text={{fontSize: 'xs'}}>
              10:38 ~ 18:32
            </Center>
            <Center>목</Center>
          </Box>
          <Box w="20%" borderWidth={1}>
            <Center borderBottomWidth={1} _text={{fontSize: 'xs'}}>
              10:38 ~ 18:32
            </Center>
            <Center>금</Center>
          </Box>
        </Box>
        <Progress value={50} w="90%" mt={5} mb={2} />
        <Box w="85%" mb={5} _text={{textAlign: 'right', fontSize: 'xl', fontWeight: 600}}>
          20시간, 12분
        </Box>
      </VStack>
    </>
  );
};