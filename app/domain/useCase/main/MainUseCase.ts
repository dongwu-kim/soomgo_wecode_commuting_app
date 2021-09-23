import {MAPS_API_KEY} from '../../../../env.json';
import {MainRepository} from '../../../data/repository/main/MainRepository';

import {ILocation} from '../../../presentation/interface/IGeolocation';
import {IWeeklyWorkLog} from '../../../presentation/interface/IWeeklyWorkLog';
import {dayOfWeekValue, todayYearMonthDate} from '../../../utils/dayjs';

export class MainUseCase extends MainRepository {
  async checkBusinessDay(): Promise<true | false> {
    const today = todayYearMonthDate();
    let holiday = await super.getHoliday();
    if (holiday?.includes(today) || dayOfWeekValue(today) === 0 || dayOfWeekValue(today) === 6) {
      return Boolean(true);
    } else {
      return Boolean(false);
    }
  }

  async reverseGeolocation(location: ILocation) {
    const {latitude, longitude} = location;

    const adressCall = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&language=ko&key=${MAPS_API_KEY}`,
    );
    const adressJson = await adressCall.json();

    const addressArr = adressJson.results[0].formatted_address.split(' ');
    const locationAddress = `${addressArr[2]} ${addressArr[3]}`;

    return locationAddress;
  }

  calcWeekWorkTimeProgress(weekWorkTimeMilliSec: number): number {
    const fiftyTwoHourMilliSec = 52 * 3600 * 1000;
    const per = (weekWorkTimeMilliSec / fiftyTwoHourMilliSec) * 100;

    return per;
  }

  getTodayWorkLog(workLog: IWeeklyWorkLog[]): IWeeklyWorkLog {
    const todayWorkLog = workLog.filter(elem => elem.day === todayYearMonthDate());
    const {day, start, end} = todayWorkLog[0];
    return {day, start, end};
  }
}
