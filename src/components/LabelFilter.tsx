import React from 'react';

import styled from 'styled-components';

const Container = styled.ul`
  width: 11rem;
  height: 50%;
  border-radius: 1rem;
  padding: 1rem;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
`;

export default function LabelFilter() {
  return (
    <Container>
      {/* TODO 라벨 필터링 */}
      <span>레이블</span>
    </Container>
  );
}
