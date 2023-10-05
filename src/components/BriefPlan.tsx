import React from 'react';
import styled from 'styled-components';

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

  p {
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TaskStatusName = styled.div`
  padding-left: 3%;
  height: 1.5rem;
  font-size: 0.8rem;
`;

const TaskFrame = styled.div`
  border: 4px solid #efefef;
  border-radius: 10px;
`;

const Task = styled.div`
  /* padding: 0 5%; */
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  text-align: center;

  &:hover {
    background-color: #efefef;
    border-radius: 5px;
  }

  .task-item {
    width: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;

    font-weight: 500;
    text-overflow: ellipsis;
    white-space: nowrap;

    .task-name {
      width: 10rem;
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

interface TaskInfo {
  name: string;
  id: string;
  status: number;
  labels: string[];
  deadline: string;
}

interface Props {
  planName: string;
  planId: string;
  tabName: string[];
  tasks: TaskInfo[];
}

function BriefPlan({ planName, planId, tabName, tasks }: Props) {
  if (tasks.length === 0) {
    return <div>empty</div>;
  }
  /* TODO: 아래 두 함수는 나중에 칸반보드 페이지에서도 조금 수정하여 활용할 수 있을 것 같다. */
  const parseTasks = () => {
    const parsedTasks = [];
    tasks.sort((a, b) => {
      if (a.status < b.status) return -1;
      if (a.status === b.status) {
        if (a.deadline === b.deadline && a.deadline.length === 0) return 0;
        if (a.deadline.length === 0 && b.deadline.length > 0) return 1;
        if (b.deadline.length === 0 && a.deadline.length > 0) return -1;
        if (a.deadline < b.deadline) return -1;
        if (a.deadline === b.deadline) return 0;
      }
      return 1;
    });

    for (let i = 0; i < tabName.length - 1; i += 1) {
      parsedTasks.push(tasks.filter((task) => task.status === i));
    }
    return parsedTasks;
  };
  const hashStringToColor = (id: string) => {
    let hash = 0;
    for (let i = 0; i < id.length; i += 1) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash); // eslint-disable-line no-bitwise
    }

    const hue = ((hash % 120) + 90) % 240;
    const saturation = 30 + (hash % 30);
    const lightness = 50 + ((hash >> 1) % 20); // eslint-disable-line no-bitwise

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  // const changeDateToDday = (date: string) => {};

  return (
    <Wrapper>
      <PlanName>
        <div>
          <p>{planName + planId}</p>
        </div>
      </PlanName>
      <TaskWrapper>
        {parseTasks().map((taskList, idx) => (
          <TaskContainer key={`${planId}-${tabName[idx]}`}>
            <TaskStatusName>
              <p>{`${tabName[idx]}(${taskList.length})`}</p>
            </TaskStatusName>
            <TaskFrame>
              {taskList.map((task) => (
                <Task key={task.id}>
                  <div className="task-item">
                    <div className="task-name">{task.name}</div>
                  </div>
                  <div className="task-item">
                    <div>{task.labels[0]}</div>
                  </div>
                  <div className="task-item">
                    <TaskDeadline color={hashStringToColor(task.id)}>
                      {task.deadline.length > 0 ? (
                        'D-5'
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
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
        ))}
      </TaskWrapper>
    </Wrapper>
  );
}

export default BriefPlan;
