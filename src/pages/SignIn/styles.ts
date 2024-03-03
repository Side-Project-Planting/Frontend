import styled from 'styled-components';

export const MainWrapper = styled.div`
  min-height: 100vh;
  padding: 3rem;
  display: flex;
  gap: 2rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;
`;

export const Descripton = styled.div`
  font-size: 1.5rem;
`;

export const HighlightSpan = styled.span`
  color: #64d4ab;
`;

export const GoogleOAuthButton = styled.button`
  width: 19rem;
  height: 3.5rem;
  background-color: #ffffff;
  border: 1px solid #dde2e8;
  border-radius: 1rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  font-family: 'Pretendard-Bold';
`;

export const LoginPolicy = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: #8993a1;
`;
