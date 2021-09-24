import {IWorkTimeInfo} from './IWorkTimeInfo';

export interface IWorkTimeDetailProps {
  navigation: any;
  startDate: string;
  endDate: string;
  workTimeDetailLog: IWorkTimeInfo[] | null;
  workTimeDetailLogLoading: boolean;
}
