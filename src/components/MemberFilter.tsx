/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { membersState } from '@recoil/atoms';

interface IMmeberFilterProp {
  selectedMember: number[];
  onClick: (id: number) => void;
}

const Memberlist = styled.ul`
  width: fit-content;
  height: 3rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const MemberItem = styled.li`
  cursor: pointer;
  position: relative;

  &:hover {
    .tooltip {
      display: block;
    }
  }
`;

const MemberImg = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  &.selected {
    border: 3px solid #64d4ab;
  }
`;

const Tooltip = styled.span`
  display: none;
  position: absolute;
  bottom: -1.2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 3.2rem;
  padding: 2px 5px;
  text-align: center;
  border-radius: 5px;
  font-size: 0.8em;
  color: #fff;
  background: #494b5a;
`;

export default function MemberFilter({ selectedMember, onClick }: IMmeberFilterProp) {
  const memberList = useRecoilValue(membersState);

  return (
    <Memberlist>
      {memberList.map((item) => (
        <MemberItem key={item.id} onClick={() => onClick(item.id)}>
          <MemberImg
            src={item.imgUrl}
            alt="profile-img"
            className={`${selectedMember.includes(item.id) && 'selected'}`}
          />
          {item.id !== 0 && <Tooltip className="tooltip">{item.name}</Tooltip>}
        </MemberItem>
      ))}
    </Memberlist>
  );
}
