export interface TaskInfo {
  name: string;
  id: string;
  status: number;
  labels: string[];
  deadline: string;
}

export interface Label {
  id: number;
  value: string;
}

export interface TaskType {
  id: number;
  title: string;
  labels: Label[];
  assignee: string;
  order: number;
  dateRange: null | string[];
}

export interface MemberType {
  id: number;
  name: string;
  imgUrl?: string;
  isAdmin: boolean;
}
