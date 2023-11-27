import axios from 'axios';

/* Auth */
export const getAuthorizedUri = async () => {
  const response = await axios.get('/api/oauth/google/authorized-uri');
  return response;
};

export const registerUser = async (requestBody: {
  profileUrl: string;
  name: string;
  authId: number;
  authorizedToken: string;
}) => {
  const response = await axios.post('/api/auth/register', requestBody, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};

/* Plan */
export const getPlanInfo = async (planId: number) => {
  const { data } = await axios.get(`/api/plans/${planId}`);
  return data;
};

export const getAllPlanTitles = async () => {
  const response = await axios.get('/api/plans/all');
  return response;
};

export const createPlan = async (requestBody: {
  title: string;
  intro: string;
  invitedEmails: string[];
  isPublic: boolean;
}) => {
  const response = await axios.post('/api/plans', requestBody);
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
  const response = await axios.post('/api/tasks', requestBody);
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
  const response = await axios.put(`/api/tasks/${taskId}`, requestBody);
  return response;
};

export const deleteTask = async (taskId: number) => {
  const response = await axios.delete(`/api/tasks/${taskId}`);
  return response;
};

/* Label */
export const createLabel = async (planId: number, name: string) => {
  const { headers } = await axios.post('/api/labels', { planId, name });
  if (headers === undefined) return -1;
  const splitLocation = headers.location.split('/');
  const lableId = splitLocation[splitLocation.length - 1];
  return lableId;
};
