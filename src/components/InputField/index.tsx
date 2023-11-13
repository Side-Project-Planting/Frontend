import React from 'react';

import { Container } from './styles';

interface Props {
  children: React.ReactNode;
}

function InputField({ children }: Props) {
  return <Container>{children}</Container>;
}

export default InputField;
