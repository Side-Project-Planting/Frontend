/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';

import { Draggable } from 'react-beautiful-dnd';
import { IoClose, IoInfinite } from 'react-icons/io5';
import { PiClockFill } from 'react-icons/pi';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { INormalModal, ITask } from 'types';

import useModal from '@hooks/useModal';
import { modalDataState } from '@recoil/atoms';
import { filteredLabelsSelector, memberSelector } from '@recoil/selectors';
import { hashStringToColor } from '@utils';

const ItemWrapper = styled.div`
  position: relative;
  width: 100%;

  &:hover .task-remove-button {
    display: flex;
  }
`;
const ItemContainer = styled.div`
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

  &:hover {
    background-color: #ececec;
  }
`;

const TaskRemoveButton = styled.button`
  display: none;
  width: 1rem;
  height: 1rem;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  color: #f44336;
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
  const setModalData = useSetRecoilState(modalDataState);
  const { openModal } = useModal();

  const removeTaskHandler = () => {
    const requestAPI = () => {
      // TODO: 서버에 태스크 삭제 요청
      onRemoveTask(task.tabId, task.id);
    };
    setModalData({ description: `"${task.title}"을 삭제할까요?`, requestAPI } as INormalModal);
    openModal('normal');
  };

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <ItemWrapper>
          <ItemContainer {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
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
          <TaskRemoveButton className="task-remove-button" type="button" onClick={removeTaskHandler}>
            <IoClose size={20} />
          </TaskRemoveButton>
        </ItemWrapper>
      )}
    </Draggable>
  );
}
