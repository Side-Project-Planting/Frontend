import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const CustomLink = styled(Link)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: black;
`;

export const Wrapper = styled.div`
  margin: 0 2rem;
  width: 18rem;
  min-width: 18rem;
  height: 98%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.2);
`;

export const PlanName = styled.div`
  padding: 0 4%;
  width: 100%;
  height: 8%;

  div {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid rgba(173, 173, 173, 0.5);

    p {
      font-size: 1.2rem;
      text-align: center;
    }
  }
`;

export const TaskWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TaskStatusName = styled.div`
  padding-left: 3%;
  height: 1.5rem;
  font-size: 0.8rem;

  p {
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

export const TaskFrame = styled.div`
  border: 4px solid #efefef;
  border-radius: 10px;
`;

export const Task = styled.div`
  padding: 0 3%;
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  text-align: center;
  font-size: 0.9rem;

  &:hover {
    background-color: #efefef;
    border-radius: 5px;
  }

  .task-item {
    display: flex;
    align-items: center;
    justify-content: center;

    font-weight: 500;
    text-overflow: ellipsis;
    white-space: nowrap;

    .task-name {
      width: 11rem;
      font-weight: 600;
    }
  }
`;

interface ITaskDeadlineProps {
  color: string;
}

export const TaskDeadline = styled.div<ITaskDeadlineProps>`
  width: 3rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: ${(props) => props.color};
  color: white;
`;

export const EmptyTaskFrame = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  justify-content: center;
`;
