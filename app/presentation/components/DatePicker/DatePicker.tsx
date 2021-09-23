import {Button} from 'native-base';
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
    <>
      <CalendarPicker
        months={['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']}
        showDayStragglers={true}
        startFromMonday={false}
        allowRangeSelection={true}
        allowBackwardRangeSelect={true}
        scrollable={true}
        onDateChange={(date, type) => {
          if (date !== null && type === 'END_DATE') {
            setEndDate(yearMonthDate(date));
          } else if (type === 'START_DATE') {
            setStartDate(yearMonthDate(date));
          }
        }}
      />
      <Button
        onPress={() => {
          navigate({
            name: otherParam,
            params: {startDate, endDate},
          });
        }}
        disabled={disabledFromValidationStartToEnd(startDate, endDate)}>
        Hi
      </Button>
    </>
  );
};
