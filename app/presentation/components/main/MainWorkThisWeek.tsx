import {Box, Center, Progress, VStack} from 'native-base';
import React from 'react';
import {Text} from 'react-native-svg';
import {dayOfWeek} from '../../../utils/dayjs';
import {IMainWorkThisWeek} from '../../interface/IMainProps';

export const MainWorkThisWeek = ({weekWorkLog, weekWorkHourMinute, weekWorkTimeProgressPercent}: IMainWorkThisWeek) => {
  let progressColor = 'emerald';

  if (weekWorkTimeProgressPercent > 76.9) {
    if (weekWorkTimeProgressPercent >= 100) {
      progressColor = 'red';
    }
    progressColor = 'warning';
  }

  const workTimeMapping = weekWorkLog?.map(dayWorkLog => {
    const start = dayWorkLog?.start.split(' ')[1];
    const end = dayWorkLog?.end.split(' ')[1];
    const day = dayOfWeek(dayWorkLog?.day);
    return (
      <Box key={dayWorkLog.day} w="20%" borderWidth={1}>
        <Center borderBottomWidth={1}>{`${day}`}</Center>
        <Center _text={{fontSize: 'sm'}}>{`${start ? start : ''} ${end ? end : ''}`}</Center>
      </Box>
    );
  });

  return (
    <>
      <Box w="90%" my={5}>
        <Text fontSize={'2xl'}>이번주 근무 </Text>
      </Box>
      <VStack w="90%" borderWidth={1} alignItems="center">
        <Box flexDirection="row">{workTimeMapping}</Box>
        <Progress value={weekWorkTimeProgressPercent} w="90%" mt={5} mb={2} colorScheme={progressColor} />
        <Box w="85%" mb={5} _text={{textAlign: 'right', fontSize: 'xl', fontWeight: 600}}>
          {weekWorkHourMinute}
        </Box>
      </VStack>
    </>
  );
};
