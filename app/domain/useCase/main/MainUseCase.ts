import {MAPS_API_KEY} from '../../../../env.json';
import {MainRepository} from '../../../data/repository/main/MainRepository';

import {ILocation} from '../../../presentation/interface/IGeolocation';

export class MainUseCase extends MainRepository {
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
}
