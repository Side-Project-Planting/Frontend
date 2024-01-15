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

// Invite
export const acceptInvitation = async (uuid: string) => {
  const response = await api.put(`/api/plans/invite/${uuid}`);
  return response;
};

/* Plan */
export const getPlanInfo = async (planId: number) => {
  const { data } = await api.get(`/api/plans/${planId}`);
  return data;
};

export const getAllPlanTitles = async () => {
  const { data } = await api.get('/api/plans/all');
  return data;
};

export const createPlan = async (requestBody: {
  title: string;
  intro: string;
  invitedEmails: string[];
  isPublic: boolean;
}) => {
  const response = await api.post('/api/plans', requestBody);
  return response;
};

export const updatePlan = async (
  id: number,
  requestBody: {
    isPublic: boolean;
    ownerId: number | undefined;
    invitedEmails: string[];
    kickingMemberIds: number[];
    title: string;
    intro: string;
  },
) => {
  const response = await api.put(`/api/plans/update/${id}`, requestBody);
  return response;
};

export const deletePlan = async (id: number) => {
  const response = await api.delete(`/api/plans/${id}`);
  return response;
};

/* Tab */
export const createNewTab = async (requestBody: { planId: number; name: string }) => {
  const response = await api.post('/api/tabs', requestBody);
  return response;
};

export const updateTabTitle = async (id: number, requestBody: { planId: number; title: string }) => {
  const response = await api.patch(`/api/tabs/${id}/title`, requestBody);
  return response;
};

export const deleteTab = async (tabId: number, currentPlanId: number) => {
  const response = await axios.delete(`/api/tabs/${tabId}?planId=${currentPlanId}`);
  return response;
};

export const dragTab = async (requestBody: { planId: number; targetId: number; newPrevId: number }) => {
  const response = await api.post('api/tabs/change-order', requestBody);
  return response;
};

/* Task */
export const createTask = async (requestBody: {
  planId: number;
  tabId: number;
  assigneeId: number | undefined;
  title: string;
  description: string;
  startDate: string | null;
  endDate: string | null;
  labels: number[];
}) => {
  const response = await api.post('/api/tasks', requestBody);
  return response;
};

export const updateTask = async (
  taskId: number,
  requestBody: {
    planId: number;
    tabId: number;
    assigneeId: number | undefined;
    title: string;
    description: string;
    startDate: string | null;
    endDate: string | null;
    labels: number[];
  },
) => {
  const response = await api.put(`/api/tasks/${taskId}`, requestBody);
  return response;
};

export const deleteTask = async (taskId: number) => {
  const response = await api.delete(`/api/tasks/${taskId}`);
  return response;
};

export const dragTask = async (requestBody: {
  planId: number;
  targetTabId: number;
  targetId: number;
  newPrevId: number | null;
}) => {
  const response = await api.put('api/tasks/change-order', requestBody);
  return response;
};

/* Label */
export const createLabel = async (planId: number, name: string) => {
  const { headers } = await api.post('/api/labels', { planId, name });
  if (headers === undefined) return -1;
  const splitLocation = headers.location.split('/');
  const lableId = splitLocation[splitLocation.length - 1];
  return lableId;
};
