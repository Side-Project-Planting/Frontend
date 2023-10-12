import React from 'react';
import styled from 'styled-components';
import ModalPortal from './Portal';
import ExitPlanModal from './ExitPlan';
import NormalModal from './Normal';
import AddTaskModal from './AddTask';

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

const ModalWrapper = styled.div<{ type: string }>`
  padding: 4rem 2.5rem;
  width: ${(props) => (props.type === 'addTask' ? '56' : '32')}rem;
  height: ${(props) => (props.type === 'addTask' ? '32' : '18')}rem;
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

type ModalType = 'normal' | 'exitPlan' | 'addTask';

interface Props {
  type: ModalType;
  description?: string;
  requestAPI: () => void;
  onClose: () => void;
  members?: string[][];
  allTags?: string[];
}

export default function Modal({ type, description, requestAPI, onClose, members, allTags }: Props) {
  return (
    <ModalPortal>
      <ModalOverlay onClick={onClose}>
        <ModalWrapper type={type} onClick={(e) => e.stopPropagation()}>
          <ModalContainer>
            {type === 'normal' && description && (
              <NormalModal description={description} requestAPI={requestAPI} onClose={onClose} />
            )}
            {type === 'exitPlan' && description && members && (
              <ExitPlanModal description={description} members={members} requestAPI={requestAPI} onClose={onClose} />
            )}
            {type === 'addTask' && members && allTags && <AddTaskModal members={members} allTags={allTags} />}
          </ModalContainer>
        </ModalWrapper>
      </ModalOverlay>
    </ModalPortal>
  );
}

Modal.defaultProps = {
  description: '',
  members: [],
  allTags: [],
};
