import { jwtDecode } from 'jwt-decode';

import { requestNewToken, setAuthorizationHeader } from '@apis';

// eslint-disable-next-line import/no-mutable-exports
let accessToken: string | null = null;

const refreshAccessToken = async () => {
  try {
    const data = await requestNewToken();
    accessToken = data.accessToken;
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
export const authenticate = async (apiRequest?: () => Promise<void>) => {
  if (!accessToken || isAccessTokenExpired()) {
    await refreshAccessToken();
  }

  if (accessToken) setAuthorizationHeader(accessToken);

  // refresh token 발급 직후 api 요청을 날려야 하는 경우 순서 보장을 위해 필요함
  //  api 요청 필요 없는 경우를 분리
  if (apiRequest) {
    await apiRequest();
  }
};

export { accessToken };
