import styled, { keyframes } from 'styled-components';

interface SpinnerContainerProps {
  display: string | undefined;
}

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const SpinnerContainer = styled.div<SpinnerContainerProps>`
  display: ${(props) => props.display};
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #4caf50;
  border-top: 4px solid transparent;
  border-radius: 50%;
  animation: ${spinAnimation} 1s linear infinite;
`;
