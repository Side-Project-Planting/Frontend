import React from 'react';

import { SpinnerContainer, Spinner } from './styles';

import { useIsFetching } from '@tanstack/react-query';

function LoadingSpinner() {
  const isFetching = useIsFetching();
  const display = isFetching >= 1 ? 'flex' : 'none';

  return (
    <SpinnerContainer display={display}>
      <Spinner />
    </SpinnerContainer>
  );
}

export default LoadingSpinner;
