export interface ITaskInfo {
  name: string;
  id: string;
  status: number;
  labels: string[];
  deadline: string;
}

export interface ILabel {
  id: number;
  value: string;
}

export interface ITask {
  id: number;
  title: string;
  tabId: number;
  labels: number[];
  assignee: string | undefined;
  assigneeId: number | undefined;
  order: number;
  dateRange: null | string[];
}

export interface IMember {
  id: number;
  name: string;
  imgUrl?: string;
  isAdmin: boolean;
  email?: string;
}

export interface ITab {
  id: number;
  title: string;
  tasks?: ITask[];
}

export interface ISelectOption {
  id: number | undefined;
  name: string | undefined;
}

export interface IAddTaskModal {
  tabId: number;
  taskOrder: number;
}
