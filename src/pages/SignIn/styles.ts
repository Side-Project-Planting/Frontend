import styled from 'styled-components';

export const MainWrapper = styled.div`
  min-height: 100dvh;
  padding-block: 3rem;
  display: flex;
  gap: 4rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  justify-content: center;
  align-items: center;
`;

export const Descripton = styled.div`
  font-size: 2rem;
`;

export const HighlightSpan = styled.span`
  color: #64d4ab;
`;

export const GoogleOAuthButton = styled.button`
  width: 19rem;
  height: 3.5rem;
  background-color: #ffffff;
  border: 1px solid #dde2e8;
  border-radius: 8px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  font-weight: 700;
`;

export const LoginPolicy = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  color: #8993a1;
`;
