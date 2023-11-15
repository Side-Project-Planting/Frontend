/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';

import axios from 'axios';
import { Draggable } from 'react-beautiful-dnd';
import { IoClose, IoInfinite } from 'react-icons/io5';
import { PiClockFill } from 'react-icons/pi';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { IEditTaskModal, INormalModal, ITask } from 'types';

import { ItemWrapper, ItemContainer, LabelField, LabelItem, InfoField, DateField, TaskRemoveButton } from './styles';

import useModal from '@hooks/useModal';
import { modalDataState } from '@recoil/atoms';
import { filteredLabelsSelector, memberSelector } from '@recoil/selectors';
import { hashStringToColor } from '@utils';

interface Props {
  task: ITask;
  index: number;
  onRemoveTask: (tabId: number, taskId: number) => void;
  onEditTask: (tabId: number, taskId: number, editedTask: ITask) => void;
}

export default function TaskItem({ task, index, onRemoveTask, onEditTask }: Props) {
  const filteredLabels = useRecoilValue(filteredLabelsSelector(task.labels));
  const assignee = useRecoilValue(memberSelector(task.assigneeId!));
  const setModalData = useSetRecoilState(modalDataState);
  const { openModal } = useModal();

  if (!task.assigneeId) return null;

  const removeTaskHandler = () => {
    const requestAPI = async () => {
      // TODO: 서버에 태스크 삭제 요청
      try {
        await axios.delete(`/api/tasks/${task.id}`);
      } catch (error) {
        // eslint-disable-next-line
        console.log(error);
      }
      onRemoveTask(task.tabId, task.id);
    };
    setModalData({ information: `"${task.title}"을 삭제할까요?`, requestAPI } as INormalModal);
    openModal('normal');
  };

  const editTaskHandler = () => {
    const requestAPI = (editedTask: ITask) => {
      onEditTask(task.tabId, task.id, editedTask);
      // TODO: 서버에 태스크 업데이트 요청
    };
    setModalData({ task, taskOrder: index, requestAPI } as IEditTaskModal);
    openModal('editTask');
  };

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <ItemWrapper>
          <ItemContainer
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onClick={editTaskHandler}
          >
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
