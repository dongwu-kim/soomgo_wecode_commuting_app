import {Text, Box, FlatList, Heading, HStack} from 'native-base';
import React from 'react';

export const WorkTimeDetail = () => {
  const data = [
    {
      id: 1,
      date: '2021-09-13',
      timeStamp: '09:45 AM',
      recentText: '출근',
    },
    {
      id: 2,
      date: '2021-09-13',
      timeStamp: '06:40 PM',
      recentText: '퇴근',
    },
    {
      id: 3,
      date: '2021-09-14',
      timeStamp: '08:50 AM',
      recentText: '출근',
    },
    {
      id: 4,
      date: '2021-09-14',
      timeStamp: '05:50 PM',
      recentText: '퇴근',
    },
  ];

  return (
    <Box
      w={{
        base: '100%',
        md: '25%',
      }}>
      <Box borderBottomWidth="2px" borderColor="#00c7ae">
        <Heading fontSize="md" p="4" pb="3">
          출퇴근 상세
        </Heading>
      </Box>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <Box
            borderBottomWidth="1px"
            borderColor="coolGray.800"
            py="4"
            backgroundColor={item.recentText === '퇴근' ? 'gray.300' : 'white'}>
            <HStack space={3} justifyContent="space-around">
              <Text fontSize="sm" color="coolGray.800" alignSelf="center">
                {item.date}
              </Text>
              <Text fontSize="sm" color="coolGray.800" alignSelf="center">
                {item.recentText}
              </Text>
              <Text fontSize="sm" color="coolGray.800" alignSelf="center">
                {item.timeStamp}
              </Text>
            </HStack>
          </Box>
        )}
        keyExtractor={item => item.id}
      />
    </Box>
  );
};
