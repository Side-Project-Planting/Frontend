import React, { useState } from 'react';

import { MdOutlineClose } from 'react-icons/md';
import styled from 'styled-components';
import { ISelectOption } from 'types';

import SelectBox from '@components/SelectBox';
import ToggleSwitch from '@components/ToggleSwitch';

interface IPlanInfo {
  title: string;
  description: string;
}

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  padding: 110px 70px 40px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgb(216, 222, 228);
`;

const InputField = styled.div`
  label {
    font-weight: 600;
  }

  input {
    display: block;
    width: 75rem;
    height: 2.2rem;
    padding: 0.5rem 0.7rem;
    margin-top: 0.4rem;
    border: 1px solid rgb(208, 215, 222);
    border-radius: 6px;
    outline: none;
    background-color: #fafafa;
    font-size: 14px;

    &.email {
      width: 600px;
      margin-top: 0;
    }

    &::placeholder {
      font-size: inherit;
    }

    &:focus {
      border: 2px solid #64d4ab;
    }
  }
`;

const ManageTeam = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h3 {
    font-weight: 600;
  }
`;

const ManageTeamContainer = styled.div`
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

const MemberList = styled.div`
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

const MemberItem = styled.li`
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

const ButtonContainer = styled.div`
  align-self: center;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Button = styled.button`
  font-size: 14px;
  height: 2.4rem;
  padding-inline: 1.5rem;
  border: none;
  border-radius: 0.5rem;
  color: #fff;

  &.save {
    background-color: #64d4ab;
  }

  &.delete {
    background-color: #ff5353;
  }
`;

const ImportantSetting = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 14px;

  h3 {
    font-size: 1rem;
    font-weight: 600;
  }
`;

const SettingItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const planData = {
  title: 'planting',
  description: '안녕하세요 저희는 일정 공유 관리 서비스를 개발하고 있는 플랜팅입니다.',
  isPublic: true,
  members: [
    {
      id: 1,
      name: '신우성',
      imgUrl:
        'https://images.unsplash.com/photo-1466112928291-0903b80a9466?auto=format&fit=crop&q=80&w=873&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      isAdmin: true,
      email: 'cys@gmail.com',
    },
    {
      id: 2,
      name: '김태훈',
      imgUrl:
        'https://images.unsplash.com/photo-1466112928291-0903b80a9466?auto=format&fit=crop&q=80&w=873&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      isAdmin: false,
      email: 'kth@gmail.com',
    },
    {
      id: 3,
      name: '허준영',
      imgUrl:
        'https://images.unsplash.com/photo-1466112928291-0903b80a9466?auto=format&fit=crop&q=80&w=873&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      isAdmin: false,
      email: 'hjy@gmail.com',
    },
    {
      id: 4,
      name: '한현',
      imgUrl:
        'https://images.unsplash.com/photo-1466112928291-0903b80a9466?auto=format&fit=crop&q=80&w=873&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      isAdmin: false,
      email: 'hh@gmail.com',
    },
  ],
  tabOrder: [2, 1, 3],
  tabs: [
    {
      id: 3,
      title: 'Done',
    },
    {
      id: 1,
      title: 'To do',
    },
    {
      id: 2,
      title: 'In Progress',
    },
  ],
  labels: [
    { id: 1, value: '개발도서' },
    { id: 2, value: '코테' },
    { id: 3, value: '이력서' },
  ],
  tasks: [
    {
      id: 1,
      title: 'NC SOFT 서류 제출',
      tabId: 3,
      labels: [3],
      assigneeId: 3,
      order: 0,
    },
    {
      id: 2,
      title: '이펙티브 완독',
      tabId: 1,
      labels: [1],
      assigneeId: 3,
      order: 0,
    },
    {
      id: 3,
      title: '타입스크립트 Chap1',
      tabId: 2,
      labels: [1],
      assigneeId: 4,
      order: 0,
    },
    {
      id: 4,
      title: '백준 삼성 기출',
      tabId: 2,
      labels: [2],
      assigneeId: 1,
      order: 1,
    },
  ],
};

function Setting() {
  const [planInfo, setPlanInfo] = useState<IPlanInfo>({
    title: planData.title,
    description: planData.description,
  });
  const [memberEmailList, setMemberEmailList] = useState<string[]>([]);
  const [isPublic, setIsPublic] = useState<boolean>(planData.isPublic);
  const initialAdmin = planData.members.find((item) => item.isAdmin === true);
  const [admin, setAdmin] = useState<ISelectOption>({ id: initialAdmin?.id, name: initialAdmin?.name });
  const [deletedList, setDeletedList] = useState<number[]>([]);
  const options = planData.members.map((member) => {
    return { id: member.id, name: member.name };
  });
  const changePlanInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPlanInfo((prev) => ({ ...prev, [name]: value }));
  };

  const addMember = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.trim();
    if (e.key !== 'Enter' || !value) return;
    setMemberEmailList((prev) => [...prev, value]);
    e.currentTarget.value = '';
  };

  const deleteMember = (deletedEmail: string) => {
    const updatedMembers = memberEmailList.filter((email) => email !== deletedEmail);
    setMemberEmailList(updatedMembers);
  };

  const togglePublic = () => {
    setIsPublic((prev) => !prev);
  };

  const handleDelete = (deletedId: number) => {
    setDeletedList((prev) => {
      if (prev.includes(deletedId)) {
        return prev.filter((id) => id !== deletedId);
      }
      return [...prev, deletedId];
    });
  };

  return (
    <Wrapper>
      <Title>플랜 설정</Title>
      <InputField>
        <label htmlFor="title">
          플랜 제목
          <input
            type="text"
            id="title"
            name="title"
            value={planInfo.title}
            onChange={changePlanInfo}
            placeholder="플랜 이름을 알려주세요"
          />
        </label>
      </InputField>
      <InputField>
        <label htmlFor="description">
          플랜 설명
          <input
            type="text"
            id="description"
            name="description"
            value={planInfo.description}
            onChange={changePlanInfo}
            placeholder="플랜을 설명해주세요"
          />
        </label>
      </InputField>
      <ManageTeam>
        <h3>팀원 관리</h3>
        <InputField>
          <input
            type="email"
            id="members"
            name="members"
            className="email"
            onKeyUp={addMember}
            placeholder="초대할 팀원의 이메일을 알려주세요"
          />
        </InputField>
        <ManageTeamContainer>
          <MemberList>
            <span className="subTitle">새로운 팀원</span>
            <ul>
              {memberEmailList.map((item) => (
                <MemberItem key={item}>
                  <span className="invite">{item}</span>
                  <button type="button" onClick={() => deleteMember(item)} className="invite">
                    <MdOutlineClose size="16" color="#939393" />
                  </button>
                </MemberItem>
              ))}
            </ul>
          </MemberList>
          <MemberList>
            <span className="subTitle">팀원 현황</span>
            <ul>
              {planData.members.map((item) => (
                <MemberItem key={item.id}>
                  <div className="memberInfo">
                    <span className="name">{item.name}</span>
                    <span>{item.email}</span>
                  </div>
                  <div className="delete">
                    {deletedList.includes(item.id) && <span className="pending">삭제 예정</span>}
                    <button type="button" onClick={() => handleDelete(item.id)} className="exist">
                      {deletedList.includes(item.id) ? '되돌리기' : '삭제'}
                    </button>
                  </div>
                </MemberItem>
              ))}
            </ul>
          </MemberList>
        </ManageTeamContainer>
      </ManageTeam>
      <ImportantSetting>
        <h3>중요 설정 변경</h3>
        <SettingItem>
          <span>관리자</span>
          <SelectBox options={options} value={admin} setValue={setAdmin} />
        </SettingItem>
        <SettingItem>
          <span>공개 여부</span>
          <ToggleSwitch isPublic={isPublic} onChange={togglePublic} />
        </SettingItem>
      </ImportantSetting>
      <ButtonContainer>
        <Button type="button" className="delete">
          플랜 삭제
        </Button>
        <Button type="submit" className="save">
          변경사항 저장
        </Button>
      </ButtonContainer>
    </Wrapper>
  );
}

export default Setting;
