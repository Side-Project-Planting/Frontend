import React from 'react';

import { IoClose } from 'react-icons/io5';
import { PiClockFill } from 'react-icons/pi';
import { RiInfinityLine } from 'react-icons/ri';
import styled from 'styled-components';

import { hashStringToColor } from '@utils';

const ItemWrapper = styled.div`
  position: relative;
  padding: 1rem;
  width: 18rem;
  min-height: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fdfdfd;
  border-radius: 10px;
  box-shadow: 1px 1px 1px 2px rgba(0, 0, 0, 0.1);

  #task-title {
    word-wrap: break-word;
  }

  button {
    display: none;
    width: 1rem;
    height: 1rem;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    color: #f44336;
  }

  &:hover {
    background-color: #ececec;
  }

  &:hover button {
    display: flex;
  }
`;

const LabelField = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const LabelItem = styled.div<{ color: string }>`
  padding: 0.1rem 0.5rem;
  border-radius: 5px;
  color: white;
  font-size: 0.7rem;
  text-align: center;
  background-color: ${(prop) => prop.color};
`;

const InfoField = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DateField = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: 0.7rem;
  line-height: 110%;

  .date-infinity {
    width: 2rem;
    display: flex;
    justify-content: center;
  }
`;

interface Label {
  id: number;
  value: string;
}

interface TaskType {
  id: number;
  title: string;
  labels: Label[];
  assignee: string;
  order: number;
  dateRange: null | string[];
}

interface Props {
  task: TaskType;
}

export default function TaskItem({ task }: Props) {
  return (
    <ItemWrapper>
      <button type="button">
        <IoClose size={20} />
      </button>
      <p id="task-title">{task.title}</p>
      <LabelField>
        {task.labels.map((label) => (
          <LabelItem key={label.id} color={hashStringToColor(label.id.toString())}>
            {label.value}
          </LabelItem>
        ))}
      </LabelField>
      <InfoField>
        <DateField>
          {task.dateRange ? (
            <>
              <PiClockFill size={16} color="#64D4AB" />
              <div>
                {`${task.dateRange[0]}`}
                <br />
                {` ~ ${task.dateRange[1]}`}
              </div>
            </>
          ) : (
            <div className="date-infinity">
              <RiInfinityLine size={24} />
            </div>
          )}
        </DateField>
        <div>{task.assignee}</div>
      </InfoField>
    </ItemWrapper>
  );
}
