import React from 'react';

import { IoClose } from 'react-icons/io5';
import { ILabel } from 'types';

import { LabelContainer } from './styles';

import { hashStringToColor } from '@utils';

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
