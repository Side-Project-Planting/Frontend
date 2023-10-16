import React from 'react';

import styled from 'styled-components';

interface LabelFiLterProps {
  labelList: { value: number; label: string }[];
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

export default function LabelFilter({ labelList, selectedLabels, onChange }: LabelFiLterProps) {
  return (
    <Container>
      <h1>레이블</h1>
      <LabelList>
        {labelList.map((item) => (
          <li key={item.value}>
            <label htmlFor={`label-${item.value}`}>
              <input
                type="checkbox"
                id={`label-${item.value}`}
                value={item.value}
                checked={selectedLabels.includes(item.value)}
                onChange={onChange}
              />
              {item.label}
            </label>
          </li>
        ))}
      </LabelList>
    </Container>
  );
}
