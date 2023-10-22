import React, { useState, useRef } from 'react';

import styled from 'styled-components';
import { ITask } from 'types';

import Dropdown from '@components/Dropdown';
import TaskItem from '@components/TaskItem';

// interface Label {
//   id: number;
//   value: string;
// }

// interface TabType {
//   id: number;
//   title: string;
//   tasks?: ITask[];
// }

// interface MemberType {
//   id: number;
//   name: string;
//   imgUrl?: string;
//   isAdmin: boolean;
// }

// interface PlanType {
//   title: string;
//   description: string;
//   isPublic: boolean;
//   members: MemberType[];
//   tabOrder: number[];
//   tabs: TabType[];
//   labels: Label[];
//   tasks: ITask[];
// }

type TabProps = {
  // plan: PlanType;
  // setPlan: Dispatch<SetStateAction<PlanType | null>>;
  id: number;
  index: number;
  title: string;
  tasks: ITask[];
  onDeleteTab: () => void;
  onSaveTitle: (title: string) => void;
  onClickHandler: () => void;
  // isDragging: boolean;
  // onDragStart: (e: React.DragEvent) => void;
  // onDragEnter: (e: React.DragEvent) => void;
  // onDragEnd: (e: React.DragEvent) => void;
};

type TabHeaderProps = {
  initialTitle: string;
  onDeleteTab: () => void;
  // eslint-disable-next-line react/no-unused-prop-types, react/require-default-props
  onClickHandler?: () => void;
  onSaveTitle: (title: string) => void;
};

type TaskContainerProps = {
  // eslint-disable-next-line react/require-default-props
  tasks?: ITask[];
  // eslint-disable-next-line react/require-default-props
  onClickHandler?: () => void;
};

const Wrapper = styled.li`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: space-between;
  cursor: grab;
  transition: opacity 0.2s;

  &.dragging {
    /* dragging할 때 curosr가 not-allowed인 버그가 있음 */
    cursor: grabbing;
    opacity: 0.5;
  }
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
  padding-inline: 0.5rem;
  border: 1.5px solid #64d4ab;
  border-radius: 0.5rem;
  background: none;
  font-size: 1rem;
  outline: none;
  width: 100%;
`;

const Container = styled.div`
  width: 20rem;
  height: calc(100% - 2rem);
  padding: 1rem;
  border-radius: 1.1rem;
  background-color: #ffffff;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  overflow: auto;
`;

const AddButton = styled.button`
  position: absolute;
  width: 17rem;
  height: 3rem;
  border-radius: 0.5rem;
  background-color: #fafafa;
  color: #8993a1;
  font-weight: 600;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
`;

function TabHeader({ initialTitle, onDeleteTab, onSaveTitle }: TabHeaderProps) {
  const tabEditOptions = [{ id: 1, label: '삭제', value: 'delete' }];
  const [title, setTitle] = useState(initialTitle);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleStartEditing = () => {
    setIsEditing(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
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

export function TasksContainer({ tasks, onClickHandler }: TaskContainerProps) {
  return (
    <Container>
      {tasks?.map((task) => <TaskItem key={task.id} task={task} />)}
      <AddButton type="button" className="add" onClick={onClickHandler}>
        {/* TODO 클릭시 일정 추가 */}
        Add Item
      </AddButton>
    </Container>
  );
}

export function Tab({
  id,
  index,
  title,
  tasks,
  onDeleteTab,
  onClickHandler,
  onSaveTitle, // isDragging,
  // onDragEnter,
} // onDragStart,
// onDragEnd,
: TabProps) {
  // console.log(isDragging, onDragStart, onDragEnter, onDragEnd);
  console.log(index);
  return (
    <Wrapper
      draggable
      data-index={index}
      data-id={id}
      className="dnd-item"
      // onDragStart={onDragStart}
      // onDragEnter={onDragEnter}
      // onDragEnd={onDragEnd}
      // className={isDragging ? 'dragging' : ''}
    >
      <TabHeader initialTitle={title} onDeleteTab={onDeleteTab} onSaveTitle={onSaveTitle} />
      <TasksContainer tasks={tasks} onClickHandler={onClickHandler} />
    </Wrapper>
  );
}
