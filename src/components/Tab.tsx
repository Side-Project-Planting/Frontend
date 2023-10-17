import React from 'react';

import { IoIosMore } from 'react-icons/io';
import styled from 'styled-components';

interface Label {
  id: number;
  value: string;
}

type TaskType = {
  id: number;
  title: string;
  labels: Label[];
  assignee: string;
  order: number;
};

type TabProps = {
  title: string;
  tasks: TaskType[];
  onEdit: () => void;
  onClickHandler: () => void;
};

type TabHeaderProps = {
  title: string;
  onEdit: () => void;
  // eslint-disable-next-line react/no-unused-prop-types, react/require-default-props
  onClickHandler?: () => void;
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

  .planTitle {
    font-size: 1.126rem;
  }

  .icon {
    cursor: pointer;
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

function TabHeader({ title, onEdit }: TabHeaderProps) {
  return (
    <Header>
      <span className="planTitle">{title}</span>
      <button type="button" className="icon" onClick={onEdit}>
        <IoIosMore size="24" />
      </button>
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

export function Tab({ title, tasks, onEdit, onClickHandler }: TabProps) {
  return (
    <Wrapper>
      <TabHeader title={title} onEdit={onEdit} />
      <TasksContainer tasks={tasks} onClickHandler={onClickHandler} />
    </Wrapper>
  );
}
