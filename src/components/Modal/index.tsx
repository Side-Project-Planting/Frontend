/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect } from 'react';

import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import AddTaskModal from '@components/Modal/AddTask';
import ExitPlanModal from '@components/Modal/ExitPlan';
import NormalModal from '@components/Modal/Normal';
import ModalPortal from '@components/Modal/Portal';
import useModal from '@hooks/useModal';
import { modalState } from '@recoil/atoms';

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
  padding: 3rem 2.5rem;
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

export default function Modal() {
  const { isOpen, type } = useRecoilValue(modalState);
  const { closeModal } = useModal();

  useEffect(() => {
    const keyDownEscCloseModal = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', keyDownEscCloseModal);
    return () => window.removeEventListener('keydown', keyDownEscCloseModal);
  }, []);

  return (
    <>
      {isOpen && (
        <ModalPortal>
          <ModalOverlay onClick={closeModal}>
            <ModalWrapper type={type} onClick={(e) => e.stopPropagation()}>
              <ModalContainer>
                {type === 'normal' && <NormalModal />}
                {type === 'exitPlan' && <ExitPlanModal />}
                {type === 'addTask' && <AddTaskModal />}
              </ModalContainer>
            </ModalWrapper>
          </ModalOverlay>
        </ModalPortal>
      )}
    </>
  );
}

Modal.defaultProps = {
  description: '',
  addTaskHandler: () => {},
};
