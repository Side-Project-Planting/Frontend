import React from 'react';

import { Wrapper, Container, Plans, MyPlanTab, EmptyTeamPlanFrame, TeamPlanTabs } from './styles';

import { ReactComponent as NoTeamPlan } from '@assets/images/noTeamPlan.svg';
import BriefPlan from '@components/BriefPlan';

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
          <MyPlanTab>
            <BriefPlan
              key={individualPlan.id}
              planName={individualPlan.name}
              planId={individualPlan.id}
              tabName={tabName}
              tasks={individualPlan.tasks}
            />
          </MyPlanTab>
          <TeamPlanTabs>
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
          </TeamPlanTabs>
        </Plans>
      </Container>
    </Wrapper>
  );
}

export default Main;
