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

  label {
    display: flex;

    input {
      margin: 0 1rem 0 0;
    }
  }
`;

export default function LabelFilter({ labelList, selectedLabels, onChange }: LabelFiLterProps) {
  return (
    <Container>
      {/* TODO 라벨 필터링 */}
      <span>레이블</span>
      <LabelList>
        {labelList.map((item) => (
          <label key={item.value} htmlFor={`label-${item.value}`}>
            <input
              type="checkbox"
              id={`label-${item.value}`}
              value={item.value}
              checked={selectedLabels.includes(item.value)}
              onChange={onChange}
            />
            {item.label}
          </label>
        ))}
      </LabelList>
    </Container>
  );
}
