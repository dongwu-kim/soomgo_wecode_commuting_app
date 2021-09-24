import React from 'react';
import {VStack, Box, Button, Heading, TextArea} from 'native-base';
import {IWorkLogProps} from '../../interface/IWorkLog';
import {Platform} from 'react-native';

export const WorkLog = ({
  yesterdayWorkLogText,
  todayWorkLogText,
  setYesterdayWorkLogText,
  setTodayWorkLogText,
  saveButtonDisabled,
  insertCheck,
  setInsertCheck,
  saveWorkLog,
}: IWorkLogProps) => {
  return (
    <VStack alignItems="center" bgColor="warmGray.200">
      <Box mt={8} pt={3} w="95%" bgColor="white" borderWidth={1} borderColor="coolGray.300" borderRadius={10}>
        <Heading fontSize="xl" mx={2}>
          어제 한 일
        </Heading>
        <TextArea
          h={40}
          mx={2}
          my={4}
          borderWidth={1}
          borderColor="coolGray.300"
          borderRadius={15}
          _focus={{borderColor: '#00c7ae'}}
          placeholder="최소 30자, 최대 200자로 입력 해주세요."
          value={yesterdayWorkLogText}
          onChangeText={e => {
            setYesterdayWorkLogText(e);
            setInsertCheck(true);
          }}
        />
      </Box>
      <Box mt={8} pt={3} w="95%" bgColor="white" borderWidth={1} borderColor="coolGray.300" borderRadius={10}>
        <Heading fontSize="xl" mx={2}>
          오늘 할 일
        </Heading>
        <TextArea
          h={40}
          mx={2}
          my={4}
          borderWidth={1}
          borderColor="coolGray.300"
          borderRadius={10}
          _focus={{borderColor: '#00c7ae'}}
          placeholder="최소 30자, 최대 200자로 입력 해주세요."
          value={todayWorkLogText}
          onChangeText={e => {
            setTodayWorkLogText(e);
            setInsertCheck(true);
          }}
        />
      </Box>
      <Box w="100%" alignItems="center" justifyContent="center">
        <Button
          w="90%"
          mt={Platform.OS === 'ios' ? 8 : 5}
          isDisabled={saveButtonDisabled}
          onPress={saveWorkLog}
          backgroundColor="#00c7ae"
          _pressed={{backgroundColor: '#5dd6c6'}}
          _disabled={{backgroundColor: '#9de7dd'}}>
          {insertCheck ? '수정하기' : '저장하기'}
        </Button>
      </Box>
    </VStack>
  );
};
