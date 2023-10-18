import React, { useState, useRef } from 'react';

import styled from 'styled-components';

import Dropdown from './Dropdown';

interface Label {
  id: number;
  value: string;
}

type TaskType = {
  title: string;
  tabId: number;
  labels: Label[];
  assigneeId: number;
  order: number;
};

type TabProps = {
  title: string;
  tasks: TaskType[];
  onEdit: () => void;
  onClickHandler: () => void;
  onChangeTitle: (title: string) => void;
};

type TabHeaderProps = {
  initialTitle: string;
  onEdit: () => void;
  // eslint-disable-next-line react/no-unused-prop-types, react/require-default-props
  onClickHandler?: () => void;
  onSave: (title: string) => void;
};

type TaskContainerProps = {
  // eslint-disable-next-line react/require-default-props
  tasks?: TaskType[];
  // eslint-disable-next-line react/require-default-props
  onClickHandler?: () => void;
};

const Wrapper = styled.li`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Header = styled.div`
  padding-inline: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .planTitle {
    font-size: 1.126rem;
  }
`;

const Container = styled.div`
  width: 19rem;
  height: calc(100% - 2rem);
  padding: 1rem;
  border-radius: 1.1rem;
  background-color: #ffffff;
  position: relative;
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

const EditableTitle = styled.input`
  border: none;
  background: none;
  font-size: 16px;
  outline: none;
  width: 100%;
`;

function TabHeader({ initialTitle, onEdit, onSave }: TabHeaderProps) {
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
    onSave(title);
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
        <span className="planTitle" onClick={handleStartEditing} aria-hidden>
          {title}
        </span>
      )}
      <Dropdown type="tab" options={tabEditOptions} onClick={onEdit} />
    </Header>
  );
}

export function TasksContainer({ tasks, onClickHandler }: TaskContainerProps) {
  return (
    <Container>
      {/* TODO 할일 칸반 리스트 */}
      {tasks?.map((item) => <span key={item.order}>{item.title}</span>)}
      {/* TODO 할일 drag&drop */}
      <AddButton type="button" className="add" onClick={onClickHandler}>
        {/* TODO 클릭시 일정 추가(모달) */}
        Add Item
      </AddButton>
    </Container>
  );
}

export function Tab({ title, tasks, onEdit, onClickHandler, onChangeTitle }: TabProps) {
  return (
    <Wrapper>
      <TabHeader initialTitle={title} onEdit={onEdit} onSave={onChangeTitle} />
      <TasksContainer tasks={tasks} onClickHandler={onClickHandler} />
    </Wrapper>
  );
}
