/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';

import { Draggable } from 'react-beautiful-dnd';
import { IoClose, IoInfinite } from 'react-icons/io5';
import { PiClockFill } from 'react-icons/pi';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { ITask } from 'types';

import { filteredLabelsSelector, memberSelector } from '@recoil/selectors';
import { hashStringToColor } from '@utils';

const ItemContainer = styled.div`
  position: relative;
  padding: 1rem;
  margin-bottom: 1rem;
  width: 99%;
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
  justify-content: center;
  font-size: 0.7rem;
  line-height: 110%;

  .date-infinity {
    width: 2rem;
    display: flex;
    justify-content: center;
  }
`;

interface Props {
  task: ITask;
  index: number;
  onRemoveTask: (tabId: number, taskId: number) => void;
}

export default function TaskItem({ task, index, onRemoveTask }: Props) {
  const filteredLabels = useRecoilValue(filteredLabelsSelector(task.labels));
  const assignee = useRecoilValue(memberSelector(task.assigneeId!));

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <ItemContainer {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <button
            type="button"
            onClick={() => {
              onRemoveTask(task.tabId, task.id);
            }}
          >
            <IoClose size={20} />
          </button>
          <p id="task-title">{task.title}</p>
          <LabelField>
            {filteredLabels.map((label) => (
              <LabelItem key={label.id} color={hashStringToColor(label.value)}>
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
                  <IoInfinite size={24} color="#1C2A4B" />
                </div>
              )}
            </DateField>
            <div>{assignee.name}</div>
          </InfoField>
        </ItemContainer>
      )}
    </Draggable>
  );
}
