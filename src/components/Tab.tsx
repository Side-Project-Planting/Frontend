/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/jsx-props-no-spreading */

import React, { useState, useRef, Dispatch, SetStateAction } from 'react';

import { Droppable } from 'react-beautiful-dnd';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { ITask } from 'types';

import Dropdown from '@components/Dropdown';
import TaskItem from '@components/TaskItem';
import useModal from '@hooks/useModal';
import { modalDataState } from '@recoil/atoms';

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
  onEditTask?: (tabId: number, taskId: number, editedTask: ITask) => void;
}

const Wrapper = styled.li`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: space-between;
`;

const Header = styled.div`
  padding-inline: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .planTitle {
    height: 2rem;
    padding-block: 0.2rem;
    width: calc(100% - 24px);
  }
`;

const EditableTitle = styled.input`
  height: 2rem;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  background: none;
  font-size: 1rem;
  outline: none;
  width: 100%;

  &:focus {
    border: 3px solid #000000;
  }
`;

const Container = styled.div`
  width: 20rem;
  height: calc(100% - 2rem);
  border-radius: 1.1rem;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const TaskList = styled.ul`
  margin: 0.5rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 38rem;
  overflow-y: auto;
`;

const AddButton = styled.button`
  width: 17rem;
  height: 3rem;
  border-radius: 0.5rem;
  background-color: #fafafa;
  color: #8993a1;
  font-weight: 600;
`;

const Interactions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`;

const TabDragBar = styled.button`
  width: 95%;
  height: 0.5rem;
  background-color: lightgray;
  border-radius: 15px;
`;

function TabHeader({ initialTitle, onDeleteTab, onSaveTitle }: ITabHeaderProps) {
  const tabEditOptions = [{ id: 1, label: '삭제', value: 'delete' }];
  const [title, setTitle] = useState(initialTitle);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleStartEditing = () => {
    setIsEditing(true);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  const handleSave = () => {
    setIsEditing(false);
    if (title.trim() === '') {
      setTitle(initialTitle);
    }
    onSaveTitle(title);
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
      <Dropdown type="tab" options={tabEditOptions} onClick={onDeleteTab} />
    </Header>
  );
}

export function TasksContainer({ id, tasks, onAddTask, onRemoveTask, onEditTask }: ITaskContainerProps) {
  const { openModal } = useModal();
  const setModalData = useSetRecoilState(modalDataState);

  const handleAddTask = () => {
    if (!tasks || !id || !onAddTask) return;
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
      <TabHeader initialTitle={title} onDeleteTab={onDeleteTab} onSaveTitle={onSaveTitle} />
      <TasksContainer id={id} tasks={tasks} onAddTask={onAddTask} onRemoveTask={onRemoveTask} onEditTask={onEditTask} />
    </Wrapper>
  );
}
