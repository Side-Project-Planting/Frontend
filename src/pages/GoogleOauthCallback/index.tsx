import React, { useEffect } from 'react';

import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

import { Wrapper } from './styles';

import { PROXY } from '@apis';

function GoogleOauthCallback() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogin = async () => {
      const queryParams = new URLSearchParams(location.search);
      const authCode = queryParams.get('code');

      if (authCode) {
        try {
          const { data } = await axios.post(`${PROXY}/api/oauth/google/login`, {
            authCode,
          });

          // 서버로부터 받아온 데이터(profileUrl, accessToken, refreshToken, old 등을 저장한다.)
          if (data.registered) {
            axios.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
            localStorage.setItem('profileUrl', data.profileUrl);
            navigate('/main');
          } else {
            navigate('/signup', { state: data });
          }
        } catch (error) {
          throw Error('서버로부터 유저 정보를 받아오는데 실패했습니다.');
        }
      } else {
        throw Error('인가 코드가 유효하지 않습니다.');
      }
    };

    handleLogin();
  }, [location, navigate]);

  return <Wrapper>로그인 중...</Wrapper>;
}

export default GoogleOauthCallback;
