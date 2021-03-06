import React from 'react';
import {Text, VStack, Box, Image, ScrollView} from 'native-base';

export const Meeting = () => {
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
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          backgroundColor: 'lightgray',
          height: '100%',
        }}>
        <Box
          w="95%"
          h="95%"
          borderWidth={1}
          borderColor="gray.300"
          borderRadius={5}
          bgColor="white"
          py={1}
          alignItems="center"
          justifyContent="center"
          mt={2}>
          <Text mb={20} fontWeight="bold" fontSize="3xl">
            구글 캘린더 연동
          </Text>
          <Text mb={20} fontWeight="bold" fontSize="3xl">
            일정 체크 기능
          </Text>
          <Text fontWeight="bold" fontSize="3xl">
            Coming Soon...
          </Text>
        </Box>
      </ScrollView>
    </VStack>
  );
};
