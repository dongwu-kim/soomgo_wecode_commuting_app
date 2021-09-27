import React from 'react';
import {Text, VStack, Box, Image, ScrollView} from 'native-base';

export const MyPage = () => {
  return (
    <VStack bgColor="white" safeArea={true}>
      <Box
        w="100%"
        justifyContent="center"
        alignItems="center"
        py={2}
        bgColor="white"
        borderColor="gray.300"
        borderBottomWidth={1}>
        <Image
          source={require('../../../../data/images/soomgo_logo_rgb.png')}
          alt="Logo"
          w="22%"
          h={10}
          resizeMode="contain"
          px={1}
        />
      </Box>
      <ScrollView contentContainerStyle={{alignItems: 'center', backgroundColor: 'lightgray', height: '100%'}}>
        <Box
          w="95%"
          h="95%"
          borderWidth={1}
          borderColor="gray.300"
          borderRadius={5}
          bgColor="white"
          py={1}
          alignItems="center"
          mt={2}>
          <Box w="100%" py={2} borderBottomWidth={2}>
            <Text fontWeight="bold" fontSize="3xl" textAlign="center">
              예상 기능
            </Text>
          </Box>
          <Box w="100%" pl={5} py={2} borderBottomWidth={1} borderBottomColor="gray.300">
            <Text fontWeight="bold" fontSize="2xl" textAlign="left">
              내 정보 + 프로필 수정
            </Text>
          </Box>
          <Box w="100%" pl={5} py={2} borderBottomWidth={1} borderBottomColor="gray.300">
            <Text fontWeight="bold" fontSize="2xl" textAlign="left">
              휴가 관리
            </Text>
          </Box>
          <Box w="100%" pl={5} py={2} borderBottomWidth={1} borderBottomColor="gray.300">
            <Text fontWeight="bold" fontSize="2xl" textAlign="left">
              근무일지 관리
            </Text>
          </Box>
          <Box w="100%" pl={5} py={2} borderBottomWidth={1} borderBottomColor="gray.300">
            <Text fontWeight="bold" fontSize="2xl" textAlign="left">
              Night Mode
            </Text>
          </Box>
          <Box w="100%" pl={5} py={2} borderBottomWidth={1} borderBottomColor="gray.300">
            <Text fontWeight="bold" fontSize="2xl" textAlign="left">
              etc...
            </Text>
          </Box>
          <Box w="100%" py={2}>
            <Text fontWeight="bold" fontSize="3xl" textAlign="center">
              Coming soon...
            </Text>
          </Box>
        </Box>
      </ScrollView>
    </VStack>
  );
};
