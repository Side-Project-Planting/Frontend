import React from 'react';

import { ModalButton, ModalButtonContainer, ModalDescription } from './CommonModalStyles';

interface NormalProps {
  description: string;
  requestAPI: () => void;
  onClose: () => void;
}

// 일반 모달
export default function NormalModal({ description, requestAPI, onClose }: NormalProps) {
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
