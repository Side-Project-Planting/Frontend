import React from 'react';

import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { labelsState } from '@recoil/atoms';

interface LabelFiLterProps {
  selectedLabels: number[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Container = styled.div`
  width: 11rem;
  height: 50%;
  border-radius: 1rem;
  padding: 1rem;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  background-color: #ffffff;
  overflow-y: auto;
`;

const LabelList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  li {
    display: flex;
    align-items: center;

    input {
      margin: 0 1rem 0 0;
    }
  }
`;

export default function LabelFilter({ selectedLabels, onChange }: LabelFiLterProps) {
  const labelList = useRecoilValue(labelsState);
  return (
    <Container>
      <h1>레이블</h1>
      <LabelList>
        {labelList.map((item) => (
          <li key={item.id}>
            <label htmlFor={`label-${item.id}`}>
              <input
                type="checkbox"
                id={`label-${item.id}`}
                value={item.id}
                checked={selectedLabels.includes(item.id)}
                onChange={onChange}
              />
              {item.value}
            </label>
          </li>
        ))}
      </LabelList>
    </Container>
  );
}
