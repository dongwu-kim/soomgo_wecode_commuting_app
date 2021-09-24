import {Text, Box, FlatList, Heading, HStack} from 'native-base';
import React from 'react';
import {IWorkTimeDetailProps} from '../../interface/IWorkTimeDetailProps';

export const WorkTimeDetail = ({
  navigation,
  startDate,
  endDate,
  workTimeDetailLog,
  workTimeDetailLogLoading,
}: IWorkTimeDetailProps) => {
  const {navigate} = navigation;
  const [startYear, startMonth, startDay] = startDate?.split('-');
  const [endYear, endMonth, endDay] = endDate?.split('-');

  return (
    <Box
      w={{
        base: '100%',
        md: '25%',
      }}
      backgroundColor="white">
      <Box borderBottomWidth="2px" borderColor="#00c7ae" justifyContent="space-between" flexDirection="row">
        <Heading fontSize="md" p="4" pb="3">
          출퇴근 상세
        </Heading>
        <Heading
          fontSize="md"
          p="4"
          pb="3"
          onPress={() => {
            navigate('DatePicker', {otherParam: 'WorkTimeDetail'});
          }}>
          {`${startMonth + '-' + startDay} ~ ${endMonth + '-' + endDay}`}
        </Heading>
      </Box>
      {!workTimeDetailLogLoading && (
        <FlatList
          data={workTimeDetailLog}
          renderItem={({item}) => (
            <Box
              borderBottomWidth="1px"
              borderColor="coolGray.200"
              py="4"
              backgroundColor={item.recentText === '퇴근' ? 'coolGray.100' : 'white'}
              _text={{fontWeight: 600}}>
              <HStack space={3} justifyContent="space-around">
                <Text fontSize="sm" color="coolGray.800" fontWeight="600" alignSelf="center">
                  {item.date}
                </Text>
                <Text fontSize="sm" color="coolGray.800" fontWeight="600" alignSelf="center">
                  {item.recentText}
                </Text>
                <Text fontSize="sm" color="coolGray.800" fontWeight="600" alignSelf="center">
                  {item.timeStamp}
                </Text>
              </HStack>
            </Box>
          )}
          keyExtractor={item => item.id}
        />
      )}
    </Box>
  );
};
