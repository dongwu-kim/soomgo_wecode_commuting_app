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
          <Text fontWeight="bold" fontSize="3xl">
            Coming Soon...
          </Text>
        </Box>
      </ScrollView>
    </VStack>
  );
};
