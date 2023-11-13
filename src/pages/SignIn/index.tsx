import React from 'react';

import axios from 'axios';

import {
  MainWrapper,
  MainContainer,
  Descripton,
  HighlightSpan,
  GoogleOAuthButton,
  ButtonContainer,
  LoginPolicy,
} from './styles';

import { ReactComponent as HomeIllust } from '@assets/images/homeIllust.svg';
import Logo from '@components/Logo/Logo';

export default function SignIn() {
  const handleOAuthRedirect = async () => {
    try {
      const response = await axios.get('/api/oauth/google/authorized-uri');
      const oauthUrl = response.data.authorizedUri;

      if (oauthUrl) {
        window.location.assign(oauthUrl);
      } else {
        throw Error('서버로부터 oauthUrl을 받아오지 못했습니다.');
      }
    } catch (error) {
      // 에러 처리
    }
  };

  return (
    <MainWrapper>
      <Logo />
      <MainContainer>
        <HomeIllust />
        <Descripton>
          <span>
            혼자 혹은 동료와 새로운 <HighlightSpan>플랜</HighlightSpan>을 생성해보세요.
          </span>
        </Descripton>
        <GoogleOAuthButton type="button" onClick={handleOAuthRedirect}>
          <ButtonContainer>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 48 48">
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
            <p>Google로 3초만에 로그인하기</p>
          </ButtonContainer>
        </GoogleOAuthButton>
        <LoginPolicy>
          <span>로그인은 개인 정보 보호 정책 및 서비스 약관에 동의하는 것을 의미하며,</span>
          <span>서비스 이용을 위해 이메일과 이름을 수집합니다.</span>
        </LoginPolicy>
      </MainContainer>
    </MainWrapper>
  );
}