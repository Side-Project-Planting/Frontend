import React from 'react';

import { BiInfinite } from 'react-icons/bi';
import { ITaskInfo } from 'types';

import {
  Wrapper,
  PlanName,
  TaskWrapper,
  EmptyTaskFrame,
  TaskContainer,
  TaskStatusName,
  TaskFrame,
  Task,
  TaskDeadline,
} from './styles';

import { ReactComponent as NoData } from '@assets/images/noData.svg';
import { hashStringToColor, parseTasksByStatus } from '@utils';

interface Props {
  planName: string;
  planId: number;
  tabName: string[];
  tasks: ITaskInfo[];
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
    <Wrapper>
      <PlanName to={`/plan/${planId}`}>
        <p>{planName}</p>
      </PlanName>
      <TaskWrapper>
        {tasks.length === 0 ? (
          <EmptyTaskFrame>
            <p>할일을 추가해주세요</p>
            <NoData />
          </EmptyTaskFrame>
        ) : (
          parseTasksByStatus(tasks, tabName).map((taskList, idx) => (
            <TaskContainer key={`${planId}-${tabName[idx]}`}>
              <TaskStatusName>{`${tabName[idx]}(${taskList.length})`}</TaskStatusName>
              <TaskFrame>
                {taskList.map((task: ITaskInfo) => (
                  <Task key={task.id}>
                    <p>{task.name}</p>
                    <TaskDeadline color={hashStringToColor(changeDateToDday(task.deadline))}>
                      {task.deadline.length > 0 ? (
                        <span>{changeDateToDday(task.deadline)}</span>
                      ) : (
                        <BiInfinite size="20" />
                      )}
                    </TaskDeadline>
                  </Task>
                ))}
              </TaskFrame>
            </TaskContainer>
          ))
        )}
      </TaskWrapper>
    </Wrapper>
  );
}

export default BriefPlan;
