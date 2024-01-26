import axios from 'axios';

// TODO: API 서버 배포 후 설정 필요
const API_URL = 'https://115.85.183.173/';

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const setAuthorizationHeader = (token: string) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

/* Auth */
export const getAuthorizedUri = async () => {
  const response = await api.get('/api/oauth/google/authorized-uri');
  return response;
};

export const requestLogin = async (authCode: string) => {
  const { data } = await api.post('/api/oauth/google/login', {
    authCode,
  });
  return data;
};

export const registerUser = async (requestBody: {
  profileUrl: string;
  name: string;
  authId: number;
  authorizedToken: string;
}) => {
  const response = await api.post('/api/auth/register', requestBody, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};

export const requestNewToken = async () => {
  const { data } = await api.post('/api/auth/refresh-token');
  return data;
};

// Main
export const getMain = async () => {
  const { data } = await api.get(`/api/plans/main`);
  return data;
};

/* Invite */
export const acceptInvitation = async (uuid: string) => {
  const response = await api.put(`/api/plans/invite/${uuid}`);
  return response;
};

/* Plan */
export const getPlanInfo = async (planId: number) => {
  if (planId === -1) return null;

  const { data } = await api.get(`/api/plans/${planId}`);
  return data;
};

export const getAllPlanTitles = async () => {
  const { data } = await api.get('/api/plans/all');
  return data;
};

export interface PlanInfo {
  requestBody: { title: string; intro: string; invitedEmails: string[]; isPublic: boolean };
}

export interface UpdatePlanInfo {
  planId: number;
  requestBody: {
    isPublic: boolean;
    ownerId: number | undefined;
    invitedEmails: string[];
    kickingMemberIds: number[];
    title: string;
    intro: string;
  };
}

export interface DeleteInfo {
  planId: number;
}

export const createNewPlan = async (params: PlanInfo) => {
  const { data } = await api.post('/api/plans', params.requestBody);
  return data;
};

export const updatePlanInfo = async (params: UpdatePlanInfo) => {
  await api.put(`/api/plans/update/${params.planId}`, params.requestBody);
};

export const deletePlan = async (params: DeleteInfo) => {
  await api.delete(`/api/plans/${params.planId}`);
};

/* Tab */
export const createNewTab = async (params: { planId: number; title: string }): Promise<void> => {
  await api.post('/api/tabs', params);
};

export const updateTabTitle = async (params: { planId: number; tabId: number; title: string }) => {
  await api.patch(`/api/tabs/${params.tabId}/title`, { planId: params.planId, title: params.title });
};

export const deleteTab = async (params: { planId: number; tabId: number }) => {
  await api.delete(`/api/tabs/${params.tabId}?planId=${params.planId}`);
};

export const dragTab = async (params: { planId: number; targetId: number; newPrevId: number | null }) => {
  await api.post('api/tabs/change-order', params);
};

/* Task */
export interface TaskInfo {
  planId: number;
  tabId: number;
  assigneeId: number | undefined;
  title: string;
  description: string;
  startDate: string | null;
  endDate: string | null;
  labels: number[];
}
export interface UpdateTaskInfo extends TaskInfo {
  taskId: number;
}

export interface DragInfo {
  planId: number;
  targetTabId: number;
  targetId: number;
  newPrevId: number | null;
}
export const getTask = async (taskId: number) => {
  const { data } = await api.get(`/api/tasks/${taskId}`);
  return data;
};

export const createNewTask = async (params: TaskInfo): Promise<void> => {
  await api.post('/api/tasks', params);
};

export const updateTask = async (params: UpdateTaskInfo) => {
  await api.put(`/api/tasks/${params.taskId}`, {
    planId: params.planId,
    tabId: params.tabId,
    assigneeId: params.assigneeId,
    title: params.title,
    description: params.description,
    startDate: params.startDate,
    endDate: params.endDate,
    labels: params.labels,
  });
};

export const deleteTask = async (params: { taskId: number }) => {
  await api.delete(`/api/tasks/${params.taskId}`);
};

export const dragTask = async (params: DragInfo) => {
  const response = await api.put('api/tasks/change-order', params);
  return response;
};

/* Label */
export interface LabelInfo {
  planId: number;
  name: string;
}

export const createNewLabel = async (params: { planId: number; name: string }): Promise<void> => {
  await api.post('/api/labels', params);
};

// export const createLabel = async (planId: number, name: string) => {
//   const { headers } = await api.post('/api/labels', { planId, name });
//   if (headers === undefined) return -1;
//   const splitLocation = headers.location.split('/');
//   const lableId = splitLocation[splitLocation.length - 1];
//   return lableId;
// };
