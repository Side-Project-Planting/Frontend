/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import { useRecoilValue } from 'recoil';

import { Memberlist, MemberItem, MemberImg, Tooltip } from './styles';

import { membersState } from '@recoil/atoms';

interface IMmeberFilterProp {
  selectedMember: number[];
  onClick: (id: number) => void;
}

export default function MemberFilter({ selectedMember, onClick }: IMmeberFilterProp) {
  const memberList = useRecoilValue(membersState);

  return (
    <Memberlist>
      {memberList.map((item) => (
        <MemberItem key={item.id} onClick={() => onClick(item.id)}>
          <MemberImg
            src={item.imgSrc}
            alt="profile-img"
            className={`${selectedMember.includes(item.id) && 'selected'}`}
          />
          {item.id !== 0 && <Tooltip className="tooltip">{item.name}</Tooltip>}
        </MemberItem>
      ))}
    </Memberlist>
  );
}
