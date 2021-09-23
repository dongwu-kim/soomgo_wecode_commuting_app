import React from 'react';
import {VStack, Text, Box, Button, Stack, Progress} from 'native-base';
import {SafeAreaView} from 'react-native';
import {dayjsNow, nowMilliSec} from '../../../utils/dayjs';
import {IMainProps} from '../../interface/IMainProps';
import {MainWorkThisWeek} from './MainWorkThisWeek';

export const Main = ({
  navigation,
  workBtn,
  address,
  commuteButtonDisabled,
  userName,
  setTimeStamp,
  loadWorkTimeLog,
  weekWorkLog,
  weekWorkHourMinute,
  weekWorkTimeProgressPercent,
  startDateFromDatePicker,
  endDateFromDatePicker,
  workTimeAverage,
  workTimeAverageNum,
}: IMainProps) => {
  const {navigate} = navigation;
  const [startYear, startMonth, startDay] = startDateFromDatePicker?.split('-');
  const [endYear, endMonth, endDay] = endDateFromDatePicker?.split('-');

  let progressColor = 'emerald';

  if (workTimeAverageNum > 76.9) {
    if (workTimeAverageNum >= 100) {
      progressColor = 'red';
    }
    progressColor = 'warning';
  }
  return (
    <SafeAreaView>
      <VStack justifyContent="center" alignItems="center">
        <Box w="100%" justifyContent="center" alignItems="center" py={2} borderBottomWidth={1}>
          <Text fontSize="xl" fontWeight={700}>
            Soomgo
          </Text>
        </Box>
        <Box w="90%" marginTop={5} marginBottom={3}>
          <Text fontSize="xl" fontWeight={600}>
            안녕하세요, {userName}님
          </Text>
        </Box>
        <Box w="90%" borderLeftWidth={5} borderColor="gray.400" paddingLeft={3}>
          <Box flexDirection="row">
            <Text marginBottom={1} fontSize="md" fontWeight={600}>
              {dayjsNow().slice(0, 10)},
            </Text>
            <Text marginLeft={3} fontSize="md" fontWeight={600}>
              {'현재 위치 : ' + address}
            </Text>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight={600}>
              {loadWorkTimeLog
                ? `${loadWorkTimeLog[0]} ${loadWorkTimeLog[1] !== loadWorkTimeLog[0] ? '~' + loadWorkTimeLog[1] : ''}`
                : '10:00 AM ~ 07:00 PM'}
            </Text>
          </Box>
        </Box>
        <Button
          w="90%"
          mt={5}
          py={4}
          borderWidth={1}
          onPress={() => {
            setTimeStamp(nowMilliSec());
            workBtn && navigate('WorkLog');
          }}
          _text={{fontSize: '3xl', color: 'black'}}
          disabled={commuteButtonDisabled !== null ? commuteButtonDisabled : false}>
          {workBtn ? '출근하기' : '퇴근하기'}
        </Button>
        <Stack w="90%" mt={2}>
          <Button
            py={2}
            bg="white"
            borderWidth={1}
            _text={{fontWeight: 600, fontSize: 'xl'}}
            onPress={() => {
              navigate('WorkTimeDetail');
            }}>
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
            }}
            onPress={() => {
              navigate('WorkLog');
            }}>
            근무일지 작성
          </Button>
        </Stack>
        <MainWorkThisWeek
          weekWorkLog={weekWorkLog}
          weekWorkHourMinute={weekWorkHourMinute}
          weekWorkTimeProgressPercent={weekWorkTimeProgressPercent}
        />
        <Box flexDirection="row" justifyContent="space-between" alignItems="center" w="90%" my={5}>
          <Text fontSize={'2xl'}>1주 평균 근로시간 </Text>
          <Text
            pr={3}
            fontSize={'md'}
            onPress={() => {
              navigate('DatePicker', {otherParam: 'Main'});
            }}>
            {`${startMonth + '-' + startDay} ~ ${endMonth + '-' + endDay}`}
          </Text>
        </Box>
        <Progress value={workTimeAverageNum} w="90%" mt={5} mb={2} colorScheme={progressColor} />
        <Box w="80%" mb={5} _text={{textAlign: 'right', fontSize: 'xl', fontWeight: 600}}>
          {workTimeAverage}
        </Box>
      </VStack>
    </SafeAreaView>
  );
};
