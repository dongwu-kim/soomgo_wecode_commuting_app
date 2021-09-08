import React from 'react';
import {VStack, Text, Box} from 'native-base';

export const Main = () => {
  return (
    <VStack justifyContent="center" alignItems="center">
      <Box
        w="100%"
        justifyContent="center"
        alignItems="center"
        py={2}
        borderBottomWidth={1}>
        <Text fontSize="xl" fontWeight={700}>
          Soomgo
        </Text>
      </Box>
      <Box w="90%" marginTop={5} marginBottom={3}>
        <Text fontSize="xl" fontWeight={600}>
          안녕하세요, ㅇㅇㅇ님
        </Text>
      </Box>
      <Box w="90%" borderLeftWidth={5} borderColor="gray.400" paddingLeft={3}>
        <Box flexDirection="row">
          <Text marginBottom={1} fontSize="md" fontWeight={600}>
            2021. 09. 07,
          </Text>
          <Text marginLeft={3} fontSize="md" fontWeight={600}>
            현재 위치 : 서울 강남구
          </Text>
        </Box>
        <Box>
          <Text fontSize="md" fontWeight={600}>
            10:00 AM ~ 8:00 PM
          </Text>
        </Box>
      </Box>
    </VStack>
  );
};
