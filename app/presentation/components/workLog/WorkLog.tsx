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
      <Box>
        <Heading>전일 진행사항</Heading>
        <TextArea
          h={20}
          placeholder="최소 30자, 최대 200자로 입력 해주세요."
          value={yesterdayWorkLogText}
          onChangeText={e => {
            setYesterdayWorkLogText(e);
            setInsertCheck(true);
          }}
        />
      </Box>
      <Box>
        <Heading>금일 예정사항</Heading>
        <TextArea
          h={20}
          placeholder="최소 30자, 최대 200자로 입력 해주세요."
          value={todayWorkLogText}
          onChangeText={e => {
            setTodayWorkLogText(e);
            setInsertCheck(true);
          }}
        />
      </Box>
      <Box>
        <Button isDisabled={saveButtonDisabled} onPress={saveWorkLog}>
          {insertCheck ? '수정하기' : '저장하기'}
        </Button>
      </Box>
    </VStack>
  );
};
