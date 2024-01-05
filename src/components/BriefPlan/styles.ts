import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 15rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 0.8rem;
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.2);
  overflow: auto;
`;

export const PlanName = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    width: 90%;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: 500;
    color: #636363;
    border-bottom: 1px solid rgba(173, 173, 173, 0.5);
  }
`;

export const TaskWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  p {
    font-size: 0.8rem;
  }
`;

export const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TaskStatusName = styled.p`
  height: 1.5rem;
  font-size: 0.8rem;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
`;

export const TaskFrame = styled.div`
  border: 1.5px solid #efefef;
  border-radius: 0.5rem;
`;

export const Task = styled.div`
  width: 100%;
  height: 2.5rem;
  padding-inline: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  font-size: 0.9rem;

  &:hover {
    background-color: #efefef;
    border-radius: 5px;
  }
`;

interface ITaskDeadlineProps {
  color: string;
}

export const TaskDeadline = styled.div<ITaskDeadlineProps>`
  width: 2.8rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.4rem;
  background-color: ${(props) => props.color};
  color: white;
  font-size: 0.8rem;
`;

export const EmptyTaskFrame = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
`;
