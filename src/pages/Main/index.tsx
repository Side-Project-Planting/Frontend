import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { ITaskInfo } from 'types';

import { Wrapper, Container, Plans, EmptyTeamPlanFrame, TeamPlanTabs } from './styles';

import { ReactComponent as NoPlan } from '@assets/images/noPlan.svg';
import BriefPlan from '@components/BriefPlan';
import { ModalButton } from '@components/Modal/CommonModalStyles';

/* 테스트용 데이터 */
interface IDummyPlan {
  name: string;
  id: number;
  tasks: ITaskInfo[];
}
const tabName = ['To do', 'In Progress', 'Done'];
const plansDummy: IDummyPlan[] = [
  {
    name: 'My plan',
    id: 1,
    tasks: [
      { name: 'task1', id: '1', status: 0, labels: ['label1', 'label2'], deadline: '2023-10-10' },
      { name: 'task2', id: '2', status: 0, labels: ['label1'], deadline: '2023-10-11' },
      { name: 'task3', id: '3', status: 0, labels: ['label2'], deadline: '' },
      { name: 'task4', id: '4', status: 0, labels: ['label1', 'label2'], deadline: '' },
      { name: 'task5', id: '5', status: 1, labels: ['label1', 'label2'], deadline: '2023-10-10' },
      { name: 'task6', id: '6', status: 1, labels: ['label1'], deadline: '2023-10-11' },
      { name: 'task7', id: '7', status: 1, labels: ['label2'], deadline: '' },
      { name: 'task8', id: '8', status: 1, labels: ['label1', 'label2'], deadline: '' },
    ],
  },
  {
    name: 'Team Plan1',
    id: 2,
    tasks: [
      { name: 'task1', id: '1', status: 0, labels: ['label1', 'label2'], deadline: '2023-10-10' },
      { name: 'task2', id: '2', status: 0, labels: ['label1'], deadline: '2023-10-11' },
      { name: 'task3', id: '3', status: 0, labels: ['label2'], deadline: '' },
      { name: 'task4', id: '4', status: 0, labels: ['label1', 'label2'], deadline: '' },
      { name: 'task5', id: '5', status: 1, labels: ['label1', 'label2'], deadline: '2023-10-10' },
      { name: 'task6', id: '6', status: 1, labels: ['label1'], deadline: '2023-10-11' },
      { name: 'task7', id: '7', status: 1, labels: ['label2'], deadline: '' },
      { name: 'task8', id: '8', status: 1, labels: ['label1', 'label2'], deadline: '' },
    ],
  },
  {
    name: 'Team Plan2',
    id: 3,
    tasks: [
      { name: 'task1', id: '1', status: 0, labels: ['label1', 'label2'], deadline: '2023-10-10' },
      { name: 'task2', id: '2', status: 0, labels: ['label1'], deadline: '2023-10-11' },
      { name: 'task3', id: '3', status: 0, labels: ['label2'], deadline: '' },
      { name: 'task4', id: '4', status: 0, labels: ['label1', 'label2'], deadline: '' },
      { name: 'task5', id: '5', status: 1, labels: ['label1', 'label2'], deadline: '2023-10-10' },
      { name: 'task6', id: '6', status: 1, labels: ['label1'], deadline: '2023-10-11' },
      { name: 'task7', id: '7', status: 1, labels: ['label2'], deadline: '' },
      { name: 'task8', id: '8', status: 1, labels: ['label1', 'label2'], deadline: '' },
    ],
  },
  {
    name: 'Team Plan3',
    id: 4,
    tasks: [],
  },
];
// const plansDummy: IDummyPlan[] = [
//   // 빈 플랜
// ];

function Main() {
  const [plans] = useState<IDummyPlan[]>(plansDummy);
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Container>
        <Plans>
          <TeamPlanTabs>
            {plans.length === 0 ? (
              <EmptyTeamPlanFrame>
                <div>
                  <p>내가 속한 플랜이 없어요 😵</p>
                  <NoPlan />
                  <ModalButton
                    type="button"
                    onClick={() => {
                      navigate('/create-plan');
                    }}
                  >
                    새 플랜 만들기
                  </ModalButton>
                </div>
              </EmptyTeamPlanFrame>
            ) : (
              plans.map((plan) => {
                return (
                  <BriefPlan key={plan.id} planName={plan.name} planId={plan.id} tabName={tabName} tasks={plan.tasks} />
                );
              })
            )}
          </TeamPlanTabs>
        </Plans>
      </Container>
    </Wrapper>
  );
}

export default Main;
