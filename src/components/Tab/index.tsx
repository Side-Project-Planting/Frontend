/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/jsx-props-no-spreading */

import React, { useState, useRef, Dispatch, SetStateAction } from 'react';

import { Droppable } from 'react-beautiful-dnd';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { INormalModal, ITask } from 'types';

import { Wrapper, Header, EditableTitle, Container, TaskList, Interactions, AddButton, TabDragBar } from './styles';

import { updateTabTitle } from '@apis';
import Dropdown from '@components/Dropdown';
import TaskItem from '@components/TaskItem';
import useModal from '@hooks/useModal';
import { modalDataState, currentPlanIdState } from '@recoil/atoms';

interface ITabProps {
  id: number;
  index: number;
  title: string;
  tasks: ITask[];
  onDeleteTab: () => void;
  onSaveTitle: (title: string) => void;
  onAddTask: Dispatch<SetStateAction<Record<number, ITask[]>>>;
  onRemoveTask: (tabId: number, taskId: number) => void;
  onEditTask?: (tabId: number, taskId: number, editedTask: ITask) => void;
}

interface ITabHeaderProps {
  id: number;
  initialTitle: string;
  onDeleteTab: () => void;
  onClickHandler?: () => void;
  onSaveTitle: (title: string) => void;
}

interface ITaskContainerProps {
  id?: number;
  tasks?: ITask[];
  onAddTask?: Dispatch<SetStateAction<Record<number, ITask[]>>>;
  onRemoveTask?: (tabId: number, taskId: number) => void;
  onEditTask?: (tabId: number, taskId: number, editedTask: ITask) => void; // TODO: ITask 타입 통일 필요
}

function TabHeader({ id, initialTitle, onDeleteTab, onSaveTitle }: ITabHeaderProps) {
  const tabEditOptions = [{ id: 1, label: '삭제', value: 'delete' }];
  const [title, setTitle] = useState(initialTitle);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { openModal } = useModal();
  const setModalData = useSetRecoilState(modalDataState);
  const currentPlanId = useRecoilValue(currentPlanIdState);

  const handleStartEditing = () => {
    setIsEditing(true);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  const handleSave = async () => {
    setIsEditing(false);
    if (title.trim() === '') {
      setTitle(initialTitle);
    }
    // api 요청을 onSaveTitle에서 해야하는지 handleSave에서 해도 되는지 확실하지 않음
    const requestBody = {
      planId: currentPlanId,
      title,
    };
    try {
      const response = await updateTabTitle(id, requestBody);
      // eslint-disable-next-line no-console
      console.log(response);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
    onSaveTitle(title);
  };

  const handleDeleteTab = () => {
    setModalData({
      information: '해당 탭을 정말 삭제하시겠어요?',
      requestAPI: onDeleteTab,
    } as INormalModal);
    openModal('normal');
  };

  return (
    <Header>
      {isEditing ? (
        <EditableTitle
          type="text"
          ref={inputRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSave();
            }
          }}
        />
      ) : (
        <div className="planTitle" onClick={handleStartEditing} aria-hidden>
          {title}
        </div>
      )}
      <Dropdown type="tab" options={tabEditOptions} onClick={handleDeleteTab} />
    </Header>
  );
}

export function TasksContainer({ id, tasks, onAddTask, onRemoveTask, onEditTask }: ITaskContainerProps) {
  const { openModal } = useModal();
  const setModalData = useSetRecoilState(modalDataState);

  const handleAddTask = () => {
    if (!id || !onAddTask) return;
    setModalData({
      tabId: id,
      taskOrder: tasks ? tasks.length : 0,
      addTaskHandler: onAddTask,
    });
    openModal('addTask');
  };

  return (
    <Container>
      {id ? (
        <Droppable droppableId={id.toString()}>
          {(provided) => (
            <TaskList {...provided.droppableProps} ref={provided.innerRef}>
              {tasks?.map((task, index) => (
                // TODO: void 함수를 주는 것 외에 다른 방식을 생각해볼 필요가 있음
                <TaskItem
                  key={task.id}
                  task={task}
                  index={index}
                  onRemoveTask={onRemoveTask || (() => {})}
                  onEditTask={onEditTask || (() => {})}
                />
              ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      ) : (
        <TaskList />
      )}
      <Interactions>
        <AddButton type="button" className="add" onClick={handleAddTask}>
          Add Item
        </AddButton>
        <TabDragBar type="button" draggable className="dnd-item" />
      </Interactions>
    </Container>
  );
}

export function Tab({
  id,
  index,
  title,
  tasks,
  onDeleteTab,
  onSaveTitle,
  onAddTask,
  onRemoveTask,
  onEditTask,
}: ITabProps) {
  return (
    <Wrapper className="dnd-tab" data-index={index} data-id={id}>
      <TabHeader id={id} initialTitle={title} onDeleteTab={onDeleteTab} onSaveTitle={onSaveTitle} />
      <TasksContainer id={id} tasks={tasks} onAddTask={onAddTask} onRemoveTask={onRemoveTask} onEditTask={onEditTask} />
    </Wrapper>
  );
}
