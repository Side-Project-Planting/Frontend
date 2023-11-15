import axios from 'axios';

export const getPlanInfo = async (planId: number) => {
  const { data } = await axios.get(`/api/plans/${planId}`);
  return data;
};

export const createLabel = async (planId: number, name: string) => {
  const { headers } = await axios.post('/api/labels', { planId, name });
  if (headers === undefined) return -1;
  const splitLocation = headers.location.split('/');
  const lableId = splitLocation[splitLocation.length - 1];
  return lableId;
};
