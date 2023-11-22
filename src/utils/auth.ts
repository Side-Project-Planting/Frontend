import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// eslint-disable-next-line import/no-mutable-exports
let accessToken: string | null = null;

const refreshAccessToken = async () => {
  try {
    const { data } = await axios.post('/api/auth/refresh-token');
    accessToken = data.accessToken;

    // TODO: 리프레시 토큰으로 엑세스 토큰 요청 후에 새로운 리프레시가 쿠키에 저장되는지 확인이 필요
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error refreshing access token:', error);
    window.location.href = 'http://localhost:3000';
  }
};

export const getTokenExpirationTime = (token: string) => {
  const decoded = jwtDecode(token);
  return decoded.exp || 0;
};

const isAccessTokenExpired = () => {
  const expirationTime = getTokenExpirationTime(accessToken || '');
  const currentTime = Math.floor(Date.now() / 1000);
  return expirationTime < currentTime;
};

// 엑세스 토큰이 없거나 토큰이 만료되면 리프레시 토큰으로 엑세스 토큰 발행 및 api요청
export const authenticate = async (apiRequest: () => Promise<void>) => {
  if (!accessToken || isAccessTokenExpired()) {
    await refreshAccessToken();
  }

  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  // TODO: 엑세스 토큰 다시 발급하고 항상 api 요청을 날리지 않을 수도 있다.
  //  api 요청 필요 없는 경우를 분리
  apiRequest();
};

export { accessToken };
