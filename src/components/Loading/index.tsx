import React from 'react';

import { Spinner } from './styles';

import { useIsFetching } from '@tanstack/react-query';

function LoadingSpinner() {
  const isFetching = useIsFetching();
  const display = isFetching ? 'block' : 'none';

  return <Spinner display={display} />;
}

export default LoadingSpinner;
