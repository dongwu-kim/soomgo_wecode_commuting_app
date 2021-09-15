import React from 'react';
import {VStack, Box, Button, Heading, TextArea} from 'native-base';

interface IWorkLogProps {
  yesterdayWorkLogText: string;
  todayWorkLogText: string;
  setYesterdayWorkLogText: React.Dispatch<React.SetStateAction<string>>;
  setTodayWorkLogText: React.Dispatch<React.SetStateAction<string>>;
  saveOrInsert: string;
  saveButtonDisabled: true | false;
  setInsertCheck: React.Dispatch<React.SetStateAction<true | false>>;
}

export const WorkLog = ({
  yesterdayWorkLogText,
  todayWorkLogText,
  setYesterdayWorkLogText,
  setTodayWorkLogText,
  saveOrInsert,
  saveButtonDisabled,
  setInsertCheck,
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
        <Button isDisabled={saveButtonDisabled}>{saveOrInsert}</Button>
      </Box>
    </VStack>
  );
};
