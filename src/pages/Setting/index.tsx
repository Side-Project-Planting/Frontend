/* eslint-disable no-console */
import React, { useState } from 'react';

import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { IMember, INormalModal, ISelectOption } from 'types';

import { Wrapper, Title, ManageTeamContainer, ImportantSetting, SettingItem, ButtonContainer, Button } from './styles';

import InputField from '@components/InputField';
import ManageTeam from '@components/ManageTeam';
import Modal from '@components/Modal';
import SelectBox from '@components/SelectBox';
import ToggleSwitch from '@components/ToggleSwitch';
import useModal from '@hooks/useModal';
import { modalDataState, planTitlesState } from '@recoil/atoms';

interface IPlanInfo {
  title: string;
  intro: string;
}

function Setting() {
  const { state } = useLocation();
  const [planInfo, setPlanInfo] = useState<IPlanInfo>({
    title: state.title,
    intro: state.intro,
  });
  const [newMemberEmailList, setNewMemberEmailList] = useState<string[]>([]);
  const [deletedExistMemberIdList, setDeletedExistMemberIdList] = useState<number[]>([]);
  const initialAdmin = state.members.find((item: IMember) => item.admin === true);
  const [admin, setAdmin] = useState<ISelectOption>({ id: initialAdmin?.id, name: initialAdmin?.name });
  const [isPublic, setIsPublic] = useState<boolean>(state.isPublic);
  const setModalData = useSetRecoilState(modalDataState);
  const { openModal } = useModal();
  const [planTitles, setPlanTitles] = useRecoilState(planTitlesState);

  const navigate = useNavigate();

  const options = state.members.map((member: IMember) => {
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
    const requestAPI = async () => {
      try {
        const response = await axios.delete(`/api/plans/${state.id}`);

        if (response.status === 204) {
          // eslint-disable-next-line no-alert
          window.alert(`플랜이 삭제되었습니다.`);
          setPlanTitles(planTitles.filter((item) => item.id !== state.id));
          // TODO: 플랜 페이지로 이동
          navigate('/plan');
        }
      } catch (error) {
        console.error('Error deleting plan:', error);
        throw error;
      }
    };
    setModalData({ information: `플랜을 정말 삭제하시겠어요?`, requestAPI } as INormalModal);
    openModal('normal');
  };

  const handleSavePlan = () => {
    const updatePlan = async () => {
      const requestBody = {
        ...planInfo,
        isPublic,
        ownerId: admin.id,
      };

      try {
        const response = await axios.put(`/api/plans/${state.id}`, requestBody);
        return response;
      } catch (error) {
        console.log(error);
        throw error;
      }
    };

    const inviteMembers = async () => {
      try {
        const response = await axios.put(`api/plans/invite/${state.id}`, newMemberEmailList);
        console.log(response);
      } catch (error) {
        console.log(error);
        throw error;
      }
    };

    const deleteMembers = async () => {
      const requestBody = {
        kickingMemberIds: deletedExistMemberIdList,
      };
      try {
        const response = await axios.put(`api/plans/kick/${state.id}`, requestBody);
        console.log(response);
      } catch (error) {
        console.log(error);
        throw error;
      }
    };

    const requestAPI = async () => {
      try {
        const [updateResponse, inviteResponse, deleteResponse] = await Promise.all([
          updatePlan(),
          inviteMembers(),
          deleteMembers(),
        ]);

        // TODO: 뭔가 한 번에 수정하는게 에러 처리하기 쉬울 듯 하다.
        // 화면과도 로직이 어울리지 않는다.
        // 멤버 초대, 강퇴는 204로 잘 온다.
        console.log('Update Response:', updateResponse);
        console.log('Invite Response:', inviteResponse);
        console.log('Delete Response:', deleteResponse);
      } catch (error) {
        console.error('Error during API requests:', error);
        throw error;
      }
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
        <label htmlFor="intro">
          플랜 설명
          <input
            type="text"
            id="intro"
            name="intro"
            value={planInfo.intro}
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
          existingMembers={state.members}
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
