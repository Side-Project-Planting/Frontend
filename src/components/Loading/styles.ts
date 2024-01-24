import styled, { keyframes } from 'styled-components';

interface SpinnerProps {
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

export const Spinner = styled.div<SpinnerProps>`
  display: ${(props) => props.display};
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  width: 40px;
  height: 40px;
  border: 4px solid #4caf50;
  border-top: 4px solid transparent;
  border-radius: 50%;
  animation: ${spinAnimation} 1s linear infinite;
`;
