/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { IMember, INormalModal, ISelectOption, IPlanTitle } from 'types';

import { Wrapper, Title, ManageTeamContainer, ImportantSetting, SettingItem, ButtonContainer, Button } from './styles';

import InputField from '@components/InputField';
import ManageTeam from '@components/ManageTeam';
import Modal from '@components/Modal';
import { queryClient } from '@components/react-query/queryClient';
import SelectBox from '@components/SelectBox';
import ToggleSwitch from '@components/ToggleSwitch';
import useModal from '@hooks/useModal';
import { useUpdatePlan } from '@hooks/useUpdatePlan';
import { currentPlanIdState, modalDataState, accessTokenState } from '@recoil/atoms';
import { authenticate } from '@utils/auth';

interface IPlanInfo {
  title: string;
  intro: string;
}

function Setting() {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
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
  const planTitles = queryClient.getQueryData<IPlanTitle[]>(['allPlanTitles']) || [];
  const setCurrentPlanId = useSetRecoilState(currentPlanIdState);
  const { deletePlanMutate, updatePlanInfoMutate } = useUpdatePlan(Number(state.id));

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
      deletePlanMutate({ planId: state.id });
      const newPlanId = planTitles.length > 1 ? planTitles.filter((item) => item.id !== state.id)[0].id : -1;
      setCurrentPlanId(newPlanId);
      // TODO: 플랜 삭제 후 플랜이 없을 때 버그 수정 필요함
      navigate('/plan');
    };
    setModalData({
      information: `플랜을 정말 삭제하시겠어요?`,
      requestAPI,
    } as INormalModal);
    openModal('normal');
  };

  const handleSavePlan = () => {
    const requestAPI = async () => {
      const requestBody = {
        ...planInfo,
        isPublic,
        ownerId: admin.id,
        invitedEmails: newMemberEmailList,
        kickingMemberIds: deletedExistMemberIdList,
      };
      updatePlanInfoMutate({ planId: state.id, requestBody });
    };

    setModalData({ information: `변경사항을 저장하시겠어요?`, requestAPI } as INormalModal);
    openModal('normal');
  };

  useEffect(() => {
    authenticate(accessToken, setAccessToken);
  }, []);

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
