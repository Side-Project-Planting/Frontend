import React from 'react';

import { useRecoilValue } from 'recoil';
import { INormalModal } from 'types';

import { ModalButton, ModalButtonContainer, ModalDescription } from '@components/Modal/CommonModalStyles';
import useModal from '@hooks/useModal';
import { modalDataState } from '@recoil/atoms';

// 일반 모달
export default function NormalModal() {
  const modalData = useRecoilValue(modalDataState) as INormalModal;
  const { closeModal } = useModal();

  const onClickHandler = () => {
    modalData.requestAPI();
    closeModal();
  };

  return (
    <>
      <ModalDescription>{modalData.description}</ModalDescription>
      <ModalButtonContainer>
        <ModalButton type="button" onClick={onClickHandler}>
          예
        </ModalButton>
        <ModalButton type="button" onClick={closeModal}>
          아니오
        </ModalButton>
      </ModalButtonContainer>
    </>
  );
}
