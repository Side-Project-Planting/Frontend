import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as NoData } from '../assets/images/noData.svg';
import { TaskInfo } from '../types/Plan';
import { hashStringToColor, parseTasksByStatus } from '../utils';

const CustomLink = styled(Link)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: black;
`;

const Wrapper = styled.div`
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

const PlanName = styled.div`
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

const TaskWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TaskStatusName = styled.div`
  padding-left: 3%;
  height: 1.5rem;
  font-size: 0.8rem;

  p {
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

const TaskFrame = styled.div`
  border: 4px solid #efefef;
  border-radius: 10px;
`;

const Task = styled.div`
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

const TaskDeadline = styled.div<{ color: string }>`
  width: 3rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: ${(props) => props.color};
  color: white;
`;

const EmptyTaskFrame = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  justify-content: center;
`;

interface Props {
  planName: string;
  planId: string;
  tabName: string[];
  tasks: TaskInfo[];
}

function BriefPlan({ planName, planId, tabName, tasks }: Props) {
  const changeDateToDday = (deadline: string) => {
    // TODO: 이후 서버와 통신할 때 전달 받는 날짜 형식이 수정된다면 함께 수정 필요
    const splitDeadline = deadline.split('-');
    const deadlineYear = parseInt(splitDeadline[0], 10);
    const deadlineMonth = parseInt(splitDeadline[1], 10) - 1; // 월은 0부터 시작하므로 1을 빼줍니다.
    const deadlineDay = parseInt(splitDeadline[2], 10);
    const targetDate = new Date(deadlineYear, deadlineMonth, deadlineDay);

    const currentDate = new Date();
    const timeDiff = targetDate.getTime() - currentDate.getTime();
    const dDay = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (dDay === 0) return 'D-Day';
    if (dDay > 0) return `D-${dDay}`;
    return `D+${Math.abs(dDay)}`;
  };

  return (
    <CustomLink to="/">
      <Wrapper>
        <PlanName>
          <div>
            <p>{planName + planId}</p>
          </div>
        </PlanName>
        <TaskWrapper>
          {tasks.length === 0 ? (
            <EmptyTaskFrame>
              <div>
                <p>아직 할 일이 추가되지 않았습니다.</p>
              </div>
              <div>
                <NoData />
              </div>
            </EmptyTaskFrame>
          ) : (
            parseTasksByStatus(tasks, tabName).map((taskList, idx) => (
              <TaskContainer key={`${planId}-${tabName[idx]}`}>
                <TaskStatusName>
                  <p>{`${tabName[idx]}(${taskList.length})`}</p>
                </TaskStatusName>
                <TaskFrame>
                  {taskList.map((task: TaskInfo) => (
                    <Task key={task.id}>
                      <div className="task-item">
                        <div className="task-name">{task.name}</div>
                      </div>
                      <div className="task-item">
                        <TaskDeadline color={hashStringToColor(changeDateToDday(task.deadline))}>
                          {task.deadline.length > 0 ? (
                            <span>{changeDateToDday(task.deadline)}</span>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="22"
                              height="22"
                              viewBox="0 0 22 22"
                              fill="none"
                            >
                              <g clipPath="url(#clip0_28_675)">
                                <path
                                  d="M17.0243 5.5C11.5078 5.5 9.3115 14.6667 4.97658 14.6667C3.03875 14.6667 1.7875 13.2202 1.7875 11C1.7875 8.77983 3.03967 7.33333 4.97658 7.33333C6.50375 7.33333 7.60008 8.31325 8.65883 9.52875L9.79917 8.09783C8.42508 6.69258 7.00333 5.5 4.97658 5.5C2.046 5.5 0 7.75042 0 11C0 14.2496 2.046 16.5 4.97658 16.5C10.4793 16.5 12.683 7.33333 17.0243 7.33333C18.9613 7.33333 20.2134 8.77983 20.2134 11C20.2134 13.2202 18.9622 14.6667 17.0243 14.6667C15.499 14.6667 14.4027 13.6877 13.3439 12.474L12.2036 13.9049C13.5777 15.3083 14.9994 16.5 17.0243 16.5C19.9549 16.5 22 14.2496 22 11C22 7.75042 19.9549 5.5 17.0243 5.5Z"
                                  fill="white"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_28_675">
                                  <rect width="22" height="22" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          )}
                        </TaskDeadline>
                      </div>
                    </Task>
                  ))}
                </TaskFrame>
              </TaskContainer>
            ))
          )}
        </TaskWrapper>
      </Wrapper>
    </CustomLink>
  );
}

export default BriefPlan;
