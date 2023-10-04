import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import SelectBox from './SelectBox';

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

const ModalDescription = styled.p`
  font-size: 1.2rem;
  text-align: center;
`;

const ModalButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

const ModalButton = styled.button`
  width: 8rem;
  height: 2.5rem;
  border-radius: 8px;
  background-color: rgba(100, 212, 171, 1);
  color: white;
  line-height: 10%;
`;

const SelectAdminContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const SelectAdminText = styled.p`
  color: #76808e;
`;

type ModalType = 'normal' | 'exitPlan';

interface Props {
  type: ModalType;
  description: string;
  requestAPI: () => void;
  onClose: () => void;
}

interface PortalProps {
  children: ReactNode;
}

interface NormalProps {
  description: string;
  requestAPI: () => void;
  onClose: () => void;
}

interface ExitPlanProps {
  description: string;
  members: string[][];
  requestAPI: () => void;
  onClose: () => void;
}

function ModalPortal({ children }: PortalProps) {
  return <>{createPortal(children, document.body)}</>;
}

// 일반 모달
function NormalModal({ description, requestAPI, onClose }: NormalProps) {
  return (
    <>
      <ModalDescription>{description}</ModalDescription>
      <ModalButtonContainer>
        <ModalButton type="button" onClick={requestAPI}>
          예
        </ModalButton>
        <ModalButton type="button" onClick={onClose}>
          아니오
        </ModalButton>
      </ModalButtonContainer>
    </>
  );
}

// 관리자가 플랜을 나갈떄 사용할 모달
function ExitPlanModal({ description, members, requestAPI, onClose }: ExitPlanProps) {
  const options = members.map((member) => {
    return { value: member[1], label: member[0] };
  });
  return (
    <>
      <ModalDescription>{description}</ModalDescription>
      <SelectAdminContainer>
        <SelectAdminText>관리자 지정</SelectAdminText>
        <SelectBox options={options} />
      </SelectAdminContainer>
      <ModalButtonContainer>
        <ModalButton type="button" onClick={requestAPI}>
          예
        </ModalButton>
        <ModalButton type="button" onClick={onClose}>
          아니오
        </ModalButton>
      </ModalButtonContainer>
    </>
  );
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
