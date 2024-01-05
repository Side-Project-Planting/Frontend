import React from 'react';

import { BiInfinite } from 'react-icons/bi';

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
import { ITabs, ITask } from '@pages/Main';
import { hashStringToColor } from '@utils';

interface Props {
  planId: number;
  planTitle: string;
  tabOrder: number[];
  tabs: ITabs[];
}

function BriefPlan({ planId, planTitle, tabOrder, tabs }: Props) {
  return (
    <Wrapper>
      <PlanName to={`/plan/${planId}`}>
        <p>{planTitle}</p>
      </PlanName>
      <TaskWrapper>
        {tabOrder.length === 0 ? (
          <EmptyTaskFrame>
            <p>할일을 추가해주세요</p>
            <NoData />
          </EmptyTaskFrame>
        ) : (
          tabs.map((tab) => (
            <TaskContainer key={`${planId}-${tab.tabId}`}>
              <TaskStatusName>{`${tab.title} (${tab.taskList.length})`}</TaskStatusName>
              <TaskFrame>
                {/* TODO, PROGRESS만 보여줄지 고민 */}
                {tab.taskList.map((task: ITask) => (
                  <Task key={task.taskId}>
                    <p>{task.title}</p>
                    <TaskDeadline color={hashStringToColor(task.dday.toString())}>
                      {task.dday > 0 ? <span>{task.dday}</span> : <BiInfinite size="20" />}
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
