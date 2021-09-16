export interface IWorkLog {
  workLog?: string;
}

export interface IWorkLogProps {
  yesterdayWorkLogText: string | undefined;
  todayWorkLogText: string | undefined;
  setYesterdayWorkLogText: React.Dispatch<React.SetStateAction<string | undefined>>;
  setTodayWorkLogText: React.Dispatch<React.SetStateAction<string | undefined>>;
  saveButtonDisabled: true | false;
  insertCheck: true | false;
  setInsertCheck: React.Dispatch<React.SetStateAction<true | false>>;
  saveWorkLog: () => void;
}
