import {Box, Center, Progress, VStack, Text} from 'native-base';
import React from 'react';
import {Platform} from 'react-native';
import {dayOfWeek, hourMinuteTime} from '../../../utils/dayjs';
import {IMainWorkThisWeek} from '../../interface/IMainProps';

export const MainWorkThisWeek = ({weekWorkLog, weekWorkHourMinute, weekWorkTimeProgressPercent}: IMainWorkThisWeek) => {
  let progressColor = 'emerald';

  if (weekWorkTimeProgressPercent > 76.9) {
    if (weekWorkTimeProgressPercent >= 100) {
      progressColor = 'red';
    }
    progressColor = 'warning';
  }

  const workTimeList = weekWorkLog?.map(dayWorkLog => {
    const start = dayWorkLog?.start ? hourMinuteTime(dayWorkLog?.start) : '';
    const end = dayWorkLog?.end ? hourMinuteTime(dayWorkLog?.end) : '';
    const day = dayOfWeek(dayWorkLog?.day);
    const holiday = dayWorkLog.holiday;

    return (
      <Box key={dayWorkLog.day} w="18%" pt={1} borderRadius={18} mx={0.5} bgColor="coolGray.100">
        <Center
          my={Platform.OS === 'ios' ? 1 : 0.2}
          _text={{color: `${holiday ? 'red.500' : 'black'}`, fontWeight: '600'}}>{`${day}`}</Center>
        <Center mb={1.5} _text={{fontSize: 'xs', letterSpacing: 1, textAlign: 'center'}}>
          {start || end ? `${start ? start : ''} ${end !== start ? end : ''}` : '근무예정'}
        </Center>
      </Box>
    );
  });

  return (
    <>
      <VStack
        w="95%"
        borderWidth={1}
        borderColor="gray.300"
        borderRadius={5}
        bgColor="white"
        py={1}
        alignItems="center"
        mt={2}>
        <Box w="90%" mt={3} mb={3}>
          <Text fontSize={Platform.OS === 'ios' ? '2xl' : 'lg'} fontWeight={600}>
            이번주 근무{' '}
          </Text>
        </Box>
        <Box flexDirection="row">{workTimeList}</Box>
        <Progress value={weekWorkTimeProgressPercent} w="90%" mt={5} mb={2} colorScheme={progressColor} />
        <Box w="85%" mb={3} _text={{textAlign: 'right', fontSize: 'lg', fontWeight: 600}}>
          {weekWorkHourMinute}
        </Box>
      </VStack>
    </>
  );
};
