import React, { useState } from 'react';

import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { IExitPlanModal, ISelectOption } from 'types';

import { ModalButton, ModalButtonContainer, ModalDescription } from '@components/Modal/CommonModalStyles';
import SelectBox from '@components/SelectBox';
import useModal from '@hooks/useModal';
import { membersState, modalDataState } from '@recoil/atoms';

const SelectAdminContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const SelectAdminText = styled.p`
  color: #76808e;
`;
// 관리자가 플랜을 나갈떄 사용할 모달
export default function ExitPlanModal() {
  const members = useRecoilValue(membersState);
  const modalData = useRecoilValue(modalDataState) as IExitPlanModal;
  const { closeModal } = useModal();
  const [admin, setAdmin] = useState<ISelectOption>({ id: -1, name: '' });
  const options = members.map((member) => {
    return { id: member.id, name: member.name };
  });

  // eslint-disable-next-line
  console.log(admin);

  return (
    <>
      <ModalDescription>{modalData.description}</ModalDescription>
      <SelectAdminContainer>
        <SelectAdminText>관리자 지정</SelectAdminText>
        <SelectBox options={options} setValue={setAdmin} />
      </SelectAdminContainer>
      <ModalButtonContainer>
        <ModalButton type="button" onClick={modalData.requestAPI}>
          예
        </ModalButton>
        <ModalButton type="button" onClick={closeModal}>
          아니오
        </ModalButton>
      </ModalButtonContainer>
    </>
  );
}
