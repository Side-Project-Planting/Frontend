import React, { useState } from 'react';

import { useSetRecoilState } from 'recoil';
import { INormalModal, ISelectOption } from 'types';

import { Wrapper, Title, ManageTeamContainer, ImportantSetting, SettingItem, ButtonContainer, Button } from './styles';

import InputField from '@components/InputField';
import ManageTeam from '@components/ManageTeam';
import Modal from '@components/Modal';
import SelectBox from '@components/SelectBox';
import ToggleSwitch from '@components/ToggleSwitch';
import useModal from '@hooks/useModal';
import { modalDataState } from '@recoil/atoms';

interface IPlanInfo {
  title: string;
  description: string;
}

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
  const [newMemberEmailList, setNewMemberEmailList] = useState<string[]>([]);
  const initialAdmin = planData.members.find((item) => item.isAdmin === true);
  const [deletedExistMemberIdList, setDeletedExistMemberIdList] = useState<number[]>([]);
  const [admin, setAdmin] = useState<ISelectOption>({ id: initialAdmin?.id, name: initialAdmin?.name });
  const [isPublic, setIsPublic] = useState<boolean>(planData.isPublic);
  const setModalData = useSetRecoilState(modalDataState);
  const { openModal } = useModal();

  const options = planData.members.map((member) => {
    return { id: member.id, name: member.name };
  });

  const changePlanInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPlanInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddMember = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = e.currentTarget.value.trim();

      if (!value) return;

      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      if (!emailPattern.test(value)) {
        // eslint-disable-next-line no-alert
        alert('유효한 이메일 주소를 입력하세요.');
        return;
      }

      setNewMemberEmailList((prev) => [...prev, value]);
      e.currentTarget.value = '';
    }
  };

  const handleDeleteNewMember = (deletedEmail: string) => {
    const updatedMembers = newMemberEmailList.filter((email) => email !== deletedEmail);
    setNewMemberEmailList(updatedMembers);
  };

  const togglePublic = () => {
    setIsPublic((prev) => !prev);
  };

  const handleDeleteExistMember = (deletedId: number) => {
    setDeletedExistMemberIdList((prev) => {
      if (prev.includes(deletedId)) {
        return prev.filter((id) => id !== deletedId);
      }
      return [...prev, deletedId];
    });
  };

  const handleDeletePlan = () => {
    const requestAPI = () => {
      // TODO: 서버에 플랜 삭제 요청
    };
    setModalData({ information: `플랜을 정말 삭제하시겠어요?`, requestAPI } as INormalModal);
    openModal('normal');
  };

  const handleSavePlan = () => {
    const requestAPI = () => {
      // TODO: 서버에 플랜 수정 요청
    };
    setModalData({ information: `변경사항을 저장하시겠어요?`, requestAPI } as INormalModal);
    openModal('normal');
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
      <ManageTeamContainer>
        <h3>팀원 관리</h3>
        <InputField>
          <input
            type="email"
            id="members"
            name="members"
            className="email"
            onKeyUp={handleAddMember}
            placeholder="초대할 팀원의 이메일을 알려주세요"
          />
        </InputField>
        <ManageTeam
          type="setting"
          newMemberEmailList={newMemberEmailList}
          existingMembers={planData.members}
          deletedExistMemberIdList={deletedExistMemberIdList}
          handleDeleteNewMember={handleDeleteNewMember}
          handleDeleteExistMember={handleDeleteExistMember}
        />
      </ManageTeamContainer>
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
        <Button type="button" className="delete" onClick={handleDeletePlan}>
          플랜 삭제
        </Button>
        <Button type="submit" className="save" onClick={handleSavePlan}>
          변경사항 저장
        </Button>
      </ButtonContainer>
      <Modal />
    </Wrapper>
  );
}

export default Setting;
