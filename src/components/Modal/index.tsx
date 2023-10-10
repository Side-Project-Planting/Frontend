import React from 'react';
import styled from 'styled-components';
import ModalPortal from './Portal';
import ExitPlanModal from './ExitPlan';
import NormalModal from './Normal';

const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(100, 212, 171, 0.1);
`;

const ModalWrapper = styled.div`
  padding: 4rem 2.5rem;
  width: 32rem;
  height: 18rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  box-shadow: 0px 4px 16px 4px rgba(0, 0, 0, 0.2);
`;

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

type ModalType = 'normal' | 'exitPlan';

interface Props {
  type: ModalType;
  description: string;
  requestAPI: () => void;
  onClose: () => void;
}

export default function Modal({ type, description, requestAPI, onClose }: Props) {
  // 테스트용 더미데이터
  const testMemebers = [
    ['신우성', 'sws@gmail.com'],
    ['김태훈', 'kth@gmail.com'],
    ['한현', 'hh@gmail.com'],
  ];
  return (
    <ModalPortal>
      <ModalOverlay>
        <ModalWrapper>
          <ModalContainer>
            {type === 'normal' && <NormalModal description={description} requestAPI={requestAPI} onClose={onClose} />}
            {type === 'exitPlan' && (
              <ExitPlanModal
                description={description}
                members={testMemebers}
                requestAPI={requestAPI}
                onClose={onClose}
              />
            )}
          </ModalContainer>
        </ModalWrapper>
      </ModalOverlay>
    </ModalPortal>
  );
}
