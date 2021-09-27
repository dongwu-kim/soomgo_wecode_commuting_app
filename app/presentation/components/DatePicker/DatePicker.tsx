import {Box, Button, VStack} from 'native-base';
import React, {useState} from 'react';
import CalendarPicker from 'react-native-calendar-picker';
import {yearMonthDate} from '../../../utils/dayjs';

export const DatePicker = ({route, navigation}: any) => {
  const {navigate} = navigation;
  const {otherParam} = route.params;
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const disabledFromValidationStartToEnd = (_startDate: string | null, _endDate: string | null) => {
    if (_startDate && _endDate) {
      return Boolean(false);
    } else {
      return Boolean(true);
    }
  };

  return (
    <VStack h="100%" justifyContent="center" alignItems="center" bgColor="warmGray.200">
      <Box w="98%" bgColor="white" py={10} borderWidth={1} borderColor="coolGray.200" borderRadius={15}>
        <CalendarPicker
          weekdays={['월', '화', '수', '목', '금', '토', '일']}
          months={['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']}
          startFromMonday={false}
          allowRangeSelection={true}
          allowBackwardRangeSelect={true}
          scrollable={true}
          onDateChange={(date, type) => {
            if (date !== null && type === 'END_DATE') {
              setEndDate(yearMonthDate(date));
            } else if (type === 'START_DATE') {
              setStartDate(yearMonthDate(date));
              setEndDate(null);
            }
          }}
          selectedRangeStartStyle={{backgroundColor: '#00c7ae'}}
          selectedRangeEndStyle={{backgroundColor: '#00c7ae'}}
          selectedRangeStyle={{backgroundColor: '#00c7ae'}}
          todayBackgroundColor="#89f3e5"
          textStyle={{fontSize: 16}}
          dayLabelsWrapper={{borderColor: '#00c7ae'}}
        />
      </Box>
      <Button
        w="90%"
        mt={10}
        onPress={() => {
          navigate({
            name: otherParam,
            params: {startDate, endDate},
          });
        }}
        bgColor="#00c7ae"
        _text={{fontSize: 'lg', fontWeight: 600}}
        disabled={disabledFromValidationStartToEnd(startDate, endDate)}>
        {disabledFromValidationStartToEnd(startDate, endDate) ? '선택하신 날짜를 확인해주세요.' : '적용하기'}
      </Button>
    </VStack>
  );
};
