import React, { useEffect } from 'react';
import axios from 'axios';

function GoogleOauthCallback() {
  const url = window.location.href;
  const urlParams = new URLSearchParams(url);
  const authCode = urlParams.get('code');

  const getUserData = async () => {
    const data = await axios.post('/oauth/google/login', { authCode });
    return data;
  };

  useEffect(() => {
    const requestLogin = async () => {
      const response = await getUserData();
      // TODO: 회원가입시 받아온 데이터(토근, 이메일 등)를 함께 넘겨줌
      window.location.assign(response.data.old ? '/' : '/signup');
    };
    requestLogin();
  }, []);

  return <div>loading..</div>;
}

export default GoogleOauthCallback;
