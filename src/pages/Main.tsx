import React from 'react';
import styled from 'styled-components';
import BriefPlan from '../components/BriefPlan';

const Wrapper = styled.main`
  width: 100dvw;
  height: 100dvh;
  padding: 70px 0 0 0;
  background-clip: content-box;
  background-color: #f5f5f7;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 3rem 0;
  display: flex;
`;

const MyPlanTapContainer = styled.div``;
const PlanTapContainer = styled.div`
  overflow-x: scroll;
  height: 95%;
  display: flex;
  gap: 2rem;
`;

/* 테스트용 데이터 */
const tabName = ['To do', 'In Progress', 'Done'];
const plans = [
  {
    name: 'My plan',
    id: '1',
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
    id: '2',
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
    id: '3',
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
];

function Main() {
  return (
    <Wrapper>
      <Container>
        <MyPlanTapContainer>
          <BriefPlan
            key={plans[0].id}
            planName={plans[0].name}
            planId={plans[0].id}
            tabName={tabName}
            tasks={plans[0].tasks}
          />
        </MyPlanTapContainer>
        <PlanTapContainer>
          {plans.map((plan, idx) => {
            if (idx !== 0)
              return (
                <BriefPlan key={plan.id} planName={plan.name} planId={plan.id} tabName={tabName} tasks={plan.tasks} />
              );
            return null;
          })}
        </PlanTapContainer>
      </Container>
    </Wrapper>
  );
}

export default Main;
