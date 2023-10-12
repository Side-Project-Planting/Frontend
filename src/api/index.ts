import axios from 'axios';

export const getPlanInfo = async () => {
  const { data } = await axios.get('/dummy/planInfo.json');
  return data;
};
