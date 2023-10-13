import React from 'react';

import styled from 'styled-components';

import { ReactComponent as NoTeamPlan } from '../assets/images/noTeamPlan.svg';
import BriefPlan from '../components/BriefPlan';

const Wrapper = styled.main`
  width: 100dvw;
  height: 100dvh;
  padding: 70px 0 0 0;
  background-clip: content-box;
  background-color: #fafafa;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 3rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Plans = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  overflow-x: scroll;
`;

const MyPlanTap = styled.div`
  padding-right: 1rem;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 2px solid rgba(173, 173, 173, 0.5);
`;

const TeamPlanTaps = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EmptyTeamPlanFrame = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  div {
    p {
      font-size: 1.1rem;
      text-align: center;
      line-height: 150%;
    }
  }
`;

/* 테스트용 데이터 */
const tabName = ['To do', 'In Progress', 'Done'];
// const plans = [
//   {
//     name: 'My plan',
//     id: '1',
//     tasks: [
//       { name: 'task1', id: '1', status: 0, labels: ['label1', 'label2'], deadline: '2023-10-10' },
//       { name: 'task2', id: '2', status: 0, labels: ['label1'], deadline: '2023-10-11' },
//       { name: 'task3', id: '3', status: 0, labels: ['label2'], deadline: '' },
//       { name: 'task4', id: '4', status: 0, labels: ['label1', 'label2'], deadline: '' },
//       { name: 'task5', id: '5', status: 1, labels: ['label1', 'label2'], deadline: '2023-10-10' },
//       { name: 'task6', id: '6', status: 1, labels: ['label1'], deadline: '2023-10-11' },
//       { name: 'task7', id: '7', status: 1, labels: ['label2'], deadline: '' },
//       { name: 'task8', id: '8', status: 1, labels: ['label1', 'label2'], deadline: '' },
//     ],
//   },
//   {
//     name: 'Team Plan1',
//     id: '2',
//     tasks: [
//       { name: 'task1', id: '1', status: 0, labels: ['label1', 'label2'], deadline: '2023-10-10' },
//       { name: 'task2', id: '2', status: 0, labels: ['label1'], deadline: '2023-10-11' },
//       { name: 'task3', id: '3', status: 0, labels: ['label2'], deadline: '' },
//       { name: 'task4', id: '4', status: 0, labels: ['label1', 'label2'], deadline: '' },
//       { name: 'task5', id: '5', status: 1, labels: ['label1', 'label2'], deadline: '2023-10-10' },
//       { name: 'task6', id: '6', status: 1, labels: ['label1'], deadline: '2023-10-11' },
//       { name: 'task7', id: '7', status: 1, labels: ['label2'], deadline: '' },
//       { name: 'task8', id: '8', status: 1, labels: ['label1', 'label2'], deadline: '' },
//     ],
//   },
//   {
//     name: 'Team Plan2',
//     id: '3',
//     tasks: [
//       { name: 'task1', id: '1', status: 0, labels: ['label1', 'label2'], deadline: '2023-10-10' },
//       { name: 'task2', id: '2', status: 0, labels: ['label1'], deadline: '2023-10-11' },
//       { name: 'task3', id: '3', status: 0, labels: ['label2'], deadline: '' },
//       { name: 'task4', id: '4', status: 0, labels: ['label1', 'label2'], deadline: '' },
//       { name: 'task5', id: '5', status: 1, labels: ['label1', 'label2'], deadline: '2023-10-10' },
//       { name: 'task6', id: '6', status: 1, labels: ['label1'], deadline: '2023-10-11' },
//       { name: 'task7', id: '7', status: 1, labels: ['label2'], deadline: '' },
//       { name: 'task8', id: '8', status: 1, labels: ['label1', 'label2'], deadline: '' },
//     ],
//   },
//   {
//     name: 'Team Plan3',
//     id: '4',
//     tasks: [],
//   },
// ];
const plans = [
  // 빈 플랜
  {
    name: 'My plan',
    id: '1',
    tasks: [],
  },
];

function Main() {
  const individualPlan = plans[0];
  const teamPlans = plans.slice(1);
  return (
    <Wrapper>
      <Container>
        <Plans>
          <MyPlanTap>
            <BriefPlan
              key={individualPlan.id}
              planName={individualPlan.name}
              planId={individualPlan.id}
              tabName={tabName}
              tasks={individualPlan.tasks}
            />
          </MyPlanTap>
          <TeamPlanTaps>
            {teamPlans.length === 0 ? (
              <EmptyTeamPlanFrame>
                <div>
                  <p>
                    Team Plan을 생성하여
                    <br />
                    팀원들과 함께 일정을 관리해보세요.
                  </p>
                </div>
                <NoTeamPlan />
              </EmptyTeamPlanFrame>
            ) : (
              teamPlans.map((plan) => {
                return (
                  <BriefPlan key={plan.id} planName={plan.name} planId={plan.id} tabName={tabName} tasks={plan.tasks} />
                );
              })
            )}
          </TeamPlanTaps>
        </Plans>
      </Container>
    </Wrapper>
  );
}

export default Main;
