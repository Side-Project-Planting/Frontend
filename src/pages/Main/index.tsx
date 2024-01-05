import React from 'react';

import { useNavigate } from 'react-router-dom';

import { Wrapper, EmptyTeamPlanFrame } from './styles';

import { ReactComponent as NoPlan } from '@assets/images/noPlan.svg';
import BriefPlan from '@components/BriefPlan';
import { ModalButton } from '@components/Modal/CommonModalStyles';
import { useMain } from '@hooks/useMain';

export interface ITask {
  taskId: number;
  title: string;
  dday: number;
}

export interface ITabs {
  tabId: number;
  title: string;
  taskList: ITask[];
  taskOrder: number[];
}

export interface IPlan {
  planId: number;
  title: string;
  tabOrder: number[];
  tabs: ITabs[];
}

function Main() {
  const { main } = useMain();

  const navigate = useNavigate();

  return (
    <Wrapper>
      {main.length === 0 ? (
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
        main.map((plan) => {
          return (
            <BriefPlan
              key={plan.planId}
              planId={plan.planId}
              planTitle={plan.title}
              tabOrder={plan.tabOrder}
              tabs={plan.tabs}
            />
          );
        })
      )}
    </Wrapper>
  );
}

export default Main;
