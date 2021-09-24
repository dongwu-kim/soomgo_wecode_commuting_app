import React from 'react';
import {VStack, Box, Button, Heading, TextArea} from 'native-base';
import {IWorkLogProps} from '../../interface/IWorkLog';

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
    <VStack>
      <Box my={2}>
        <Heading mx={2}>어제 한 일</Heading>
        <TextArea
          h={40}
          mx={2}
          my={4}
          border={1}
          placeholder="최소 30자, 최대 200자로 입력 해주세요."
          value={yesterdayWorkLogText}
          onChangeText={e => {
            setYesterdayWorkLogText(e);
            setInsertCheck(true);
          }}
        />
      </Box>
      <Box my={2}>
        <Heading mx={2}>오늘 할 일</Heading>
        <TextArea
          h={40}
          mx={2}
          my={4}
          border={1}
          placeholder="최소 30자, 최대 200자로 입력 해주세요."
          value={todayWorkLogText}
          onChangeText={e => {
            setTodayWorkLogText(e);
            setInsertCheck(true);
          }}
        />
      </Box>
      <Box>
        <Button position="relative" mt={20} isDisabled={saveButtonDisabled} onPress={saveWorkLog}>
          {insertCheck ? '수정하기' : '저장하기'}
        </Button>
      </Box>
    </VStack>
  );
};
