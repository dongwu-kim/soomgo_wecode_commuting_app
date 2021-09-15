import React from 'react';
import {VStack, Text, Box, Button, Stack, Center, Progress} from 'native-base';
import {SafeAreaView} from 'react-native';

export const Main = () => {
  return (
    <SafeAreaView>
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
        <Button
          w="90%"
          mt={5}
          py={4}
          borderWidth={1}
          _text={{fontSize: '3xl', color: 'black'}}>
          출근하기
        </Button>
        <Stack w="90%" mt={2}>
          <Button
            py={2}
            bg="white"
            borderWidth={1}
            _text={{fontWeight: 600, fontSize: 'xl'}}>
            출퇴근 기록 확인하기
          </Button>
          <Button
            py={2}
            bg="white"
            borderWidth={1}
            mt={1}
            _text={{
              fontWeight: 600,
              fontSize: 'xl',
            }}>
            근무일지 작성
          </Button>
        </Stack>
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
          <Box
            w="85%"
            mb={5}
            _text={{textAlign: 'right', fontSize: 'xl', fontWeight: 600}}>
            20시간, 12분
          </Box>
        </VStack>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          w="90%"
          my={5}>
          <Text fontSize={'2xl'}>1주 평균 근로시간 </Text>
          <Text pr={3} fontSize={'md'}>
            09.01 ~ 09.05
          </Text>
        </Box>
        <Progress value={85} w="85%" mt={5} mb={2} />
        <Box
          w="80%"
          mb={5}
          _text={{textAlign: 'right', fontSize: 'xl', fontWeight: 600}}>
          41시간, 12분
        </Box>
      </VStack>
    </SafeAreaView>
  );
};
