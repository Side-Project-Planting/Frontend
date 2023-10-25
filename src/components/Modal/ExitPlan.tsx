import React, { useState } from 'react';

import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { ISelectOption } from 'types';

import { ModalButton, ModalButtonContainer, ModalDescription } from '@components/Modal/CommonModalStyles';
import SelectBox from '@components/SelectBox';
import { membersState } from '@recoil/atoms';

const SelectAdminContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const SelectAdminText = styled.p`
  color: #76808e;
`;

interface ExitPlanProps {
  description: string;
  requestAPI: () => void;
  onClose: () => void;
}

// 관리자가 플랜을 나갈떄 사용할 모달
export default function ExitPlanModal({ description, requestAPI, onClose }: ExitPlanProps) {
  const members = useRecoilValue(membersState);
  const [admin, setAdmin] = useState<ISelectOption>({ id: -1, name: '' });
  const options = members.map((member) => {
    return { id: member.id, name: member.name };
  });

  // eslint-disable-next-line
  console.log(admin);

  return (
    <>
      <ModalDescription>{description}</ModalDescription>
      <SelectAdminContainer>
        <SelectAdminText>관리자 지정</SelectAdminText>
        <SelectBox options={options} setValue={setAdmin} />
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
