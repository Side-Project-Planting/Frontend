import axios from 'axios';

export const getPlanInfo = async (planId: number) => {
  // const { data } = await axios.get('/dummy/planInfo-1.json');
  console.log('getPlanInfo');
  const { data } = await axios.get(`/api/plans/${planId}`);
  return data;
};

export const createLabel = async (planId: number, name: string) => {
  // TODO: label id를 받아오는 방식에 대한 이야기가 필요함
  // const { data } = await axios.post('/labels', { planId, name });
  // eslint-disable-next-line
  console.log(planId, name);
  return { id: Math.floor(Math.random() * 1000) + 10 };
};
