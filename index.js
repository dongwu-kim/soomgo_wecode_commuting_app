import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {Maps} from './app/presentation/components/map/Maps';
import {Navigation} from './Navigation';

AppRegistry.registerComponent(appName, () => Navigation);
