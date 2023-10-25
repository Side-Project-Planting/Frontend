/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import allImg from '@assets/images/allImg.svg';
import { membersState } from '@recoil/atoms';

interface IMmeberFilterProp {
  selectedMember: number;
  onClick: (id: number) => void;
}

const Memberlist = styled.ul`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const MemberItem = styled.li`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;

  &.selected {
    border: 3px solid #64d4ab;
  }
`;

const MemberImg = styled.img`
  width: 100%;
  height: 100%;
`;

export default function MemberFilter({ selectedMember, onClick }: IMmeberFilterProp) {
  const memberList = useRecoilValue(membersState);
  const modifiedMemberList = [{ id: 0, name: 'All', imgUrl: allImg, isAdmin: false }, ...memberList];

  return (
    <Memberlist>
      {modifiedMemberList.map((item) => (
        <MemberItem
          key={item.id}
          onClick={() => onClick(item.id)}
          className={`${selectedMember === item.id && 'selected'}`}
        >
          <MemberImg src={item.imgUrl} alt="profile-img" />
        </MemberItem>
      ))}
    </Memberlist>
  );
}
