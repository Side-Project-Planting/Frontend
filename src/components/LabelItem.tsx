import React from 'react';

import { IoClose } from 'react-icons/io5';
import styled from 'styled-components';
import { ILabel } from 'types';

import { hashStringToColor } from '@utils';

const LabelContainer = styled.li<{ height: number; color: string }>`
  list-style: none;
  position: relative;
  padding: 0.5rem 1rem;
  height: ${(prop) => prop.height}rem;
  border-radius: 10px;
  color: white;
  text-align: center;
  line-height: 110%;
  background-color: ${(prop) => prop.color};

  button {
    display: none;
    width: 1rem;
    height: 1rem;
    position: absolute;
    bottom: 1rem;
    right: -0.3rem;
    color: #f44336;
    background-color: white;
    border: 1px solid lightgray;
    border-radius: 50%;
    line-height: 110%;
  }
  &:hover button {
    display: flex;
  }
`;

interface Props {
  height: number;
  labelInfo: ILabel;
  deleteHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function LabelItem({ height, labelInfo, deleteHandler }: Props) {
  return (
    <LabelContainer id={labelInfo.id.toString()} height={height} color={hashStringToColor(labelInfo.value)}>
      <span>{labelInfo.value}</span>
      <button id={`delete-${labelInfo.value}`} type="button" onClick={deleteHandler}>
        <IoClose />
      </button>
    </LabelContainer>
  );
}
