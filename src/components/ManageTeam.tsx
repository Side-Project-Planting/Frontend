/* eslint-disable react/require-default-props */
import React from 'react';

import { MdOutlineClose } from 'react-icons/md';
import styled from 'styled-components';
import { IMember } from 'types';

interface Props {
  type: string;
  newMemberEmailList: string[];
  existingMembers?: IMember[];
  deletedExistMemberIdList?: number[];
  handleDeleteNewMember: (deletedEmail: string) => void;
  handleDeleteExistMember?: (deletedId: number) => void;
}

const Container = styled.div`
  min-height: 15rem;
  background-color: #fafafa;
  padding: 1rem;
  border: 1px solid rgb(208, 215, 222);
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  color: #939393;
  font-size: 14px;
`;

const List = styled.div`
  .subTitle {
    font-weight: 600;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
`;

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .invite {
    color: #000;
  }

  .memberInfo {
    display: flex;
    flex-direction: column;

    .name {
      font-weight: 600;
      color: #000;
    }
  }

  .delete {
    display: flex;
    align-items: center;

    .pending {
      margin-right: 1rem;
      color: #cf2d7b;
      font-weight: 600;
    }
  }

  button {
    font-weight: 600;
    color: #939393;

    &.invite {
      height: fit-content;
      border: none;
    }

    &.exist {
      border-radius: 0.5rem;
      border: 1px solid #d1d1d1;
      padding-inline: 0.9rem;
      height: 2.2rem;
      transition:
        color,
        background-color,
        border 0.3s cubic-bezier(0.33, 1, 0.68, 1);

      &:hover {
        background-color: #ff5353;
        color: #fff;
        border: none;
      }
    }
  }
`;

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
                  <span>{item.email}</span>
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
