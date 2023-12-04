import { Dispatch, SetStateAction } from 'react';

export interface IPlan {
  id: number;
  title: string;
  description: string;
  public: boolean;
  members: IMember[];
  tabOrder: number[];
  tabs: ITab[];
  labels: ILabel[];
  tasks: ITask[];
}

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
  assigneeId: number | undefined;
  startDate: string | null;
  endDate: string | null;
  description: string;
}

export interface IMember {
  id: number;
  name: string;
  imgSrc?: string;
  admin: boolean;
  mail?: string;
}

export interface ITab {
  id: number;
  title: string;
  tasks?: ITask[];
}

export interface IPlanTitle {
  id: number;
  title: string;
}

export interface ISelectOption {
  id: number | undefined;
  name: string | undefined;
}

export interface IModalInfo {
  isOpen: boolean;
  type: TModalType;
}

export interface INormalModal {
  information: string;
  requestAPI: () => void;
}

export interface IExitPlanModal extends INormalModal {}

export interface IAddTaskModal {
  tabId: number;
  taskOrder: number;
  addTaskHandler: Dispatch<SetStateAction<Record<number, ITask[]>>>;
}

export interface IEditTaskModal {
  task: ITask;
  taskOrder: number;
  requestAPI: (editedTask: ITask) => void;
}

export type TModalType = 'none' | 'normal' | 'exitPlan' | 'addTask' | 'editTask';

export type TModalData = null | INormalModal | IExitPlanModal | IAddTaskModal | IEditTaskModal;
