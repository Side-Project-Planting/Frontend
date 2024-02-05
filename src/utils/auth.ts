import { jwtDecode } from 'jwt-decode';

import { requestNewToken, setAuthorizationHeader } from '@apis';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const refreshAccessToken = async (setAccessToken: any) => {
  let accessToken;
  try {
    const data = await requestNewToken();
    accessToken = data.accessToken;
    setAccessToken(accessToken);
    setAuthorizationHeader(accessToken);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error refreshing access token:', error);
    // TODO: 배포 URL로 수정
    window.location.href = 'http://localhost:3000';
  }
  return accessToken;
};

export const getTokenExpirationTime = (token: string) => {
  const decoded = jwtDecode(token);
  return decoded.exp || 0;
};

const isAccessTokenExpired = (accessToken: string) => {
  const expirationTime = getTokenExpirationTime(accessToken || '');
  const currentTime = Math.floor(Date.now() / 1000);
  return expirationTime - 1 <= currentTime;
};

// 엑세스 토큰이 없거나 토큰이 만료되면 리프레시 토큰으로 엑세스 토큰 발행 및 api요청
export const authenticate = async (
  accessToken: string | null,
  setAccessToken: unknown,
  apiRequest?: () => Promise<void>,
) => {
  if (!accessToken || isAccessTokenExpired(accessToken)) {
    const newAccessToken = await refreshAccessToken(setAccessToken);
    if (newAccessToken && apiRequest) {
      // refresh token 발급 직후 api 요청을 날려야 하는 경우 순서 보장을 위해 필요함
      //  api 요청 필요 없는 경우를 분리
      await apiRequest();
    }
  }
};
