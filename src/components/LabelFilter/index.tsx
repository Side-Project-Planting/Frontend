import React from 'react';

import { useRecoilValue } from 'recoil';

import { Container, LabelList } from './styles';

import { labelsState } from '@recoil/atoms';

interface LabelFiLterProps {
  selectedLabels: number[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

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
