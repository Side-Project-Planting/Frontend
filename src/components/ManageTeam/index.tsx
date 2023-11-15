/* eslint-disable react/require-default-props */
import React from 'react';

import { MdOutlineClose } from 'react-icons/md';
import { IMember } from 'types';

import { Container, List, Item } from './styles';

interface Props {
  type: string;
  newMemberEmailList: string[];
  existingMembers?: IMember[];
  deletedExistMemberIdList?: number[];
  handleDeleteNewMember: (deletedEmail: string) => void;
  handleDeleteExistMember?: (deletedId: number) => void;
}

function ManageTeam({
  type,
  newMemberEmailList,
  existingMembers,
  deletedExistMemberIdList,
  handleDeleteNewMember,
  handleDeleteExistMember,
}: Props) {
  return (
    <Container>
      <List>
        <span className="subTitle">새로운 팀원</span>
        <ul>
          {newMemberEmailList.map((item) => (
            <Item key={item}>
              <span className="invite">{item}</span>
              <button type="button" onClick={() => handleDeleteNewMember(item)} className="invite">
                <MdOutlineClose size="16" color="#939393" />
              </button>
            </Item>
          ))}
        </ul>
      </List>
      {type === 'setting' && (
        <List>
          <span className="subTitle">팀원 현황</span>
          <ul>
            {existingMembers?.map((item) => (
              <Item key={item.id}>
                <div className="memberInfo">
                  <span className="name">{item.name}</span>
                  <span>{item.mail}</span>
                </div>
                <div className="delete">
                  {deletedExistMemberIdList?.includes(item.id) && <span className="pending">삭제 예정</span>}
                  <button type="button" onClick={() => handleDeleteExistMember!(item.id)} className="exist">
                    {deletedExistMemberIdList?.includes(item.id) ? '되돌리기' : '삭제'}
                  </button>
                </div>
              </Item>
            ))}
          </ul>
        </List>
      )}
    </Container>
  );
}

export default ManageTeam;
