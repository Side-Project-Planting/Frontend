import React, { useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import {
  Wrapper,
  Title,
  BottomContainer,
  ManageTeamContainer,
  ImageContainer,
  PublicContainer,
  Button,
} from './styles';

import boardIllust from '@assets/images/boardIllust.svg';
import InputField from '@components/InputField';
import ManageTeam from '@components/ManageTeam';
import ToggleSwitch from '@components/ToggleSwitch';

type PlanInfo = {
  title: string;
  intro: string;
};

function CreatePlan() {
  const [planInfo, setPlanInfo] = useState<PlanInfo>({
    title: '',
    intro: '',
  });
  const [invitedEmails, setInvitedEmails] = useState<string[]>([]);
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const navigate = useNavigate();

  const changePlanInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPlanInfo((prev) => ({ ...prev, [name]: value }));
  };

  const togglePublic = () => {
    setIsPublic((prev) => !prev);
  };

  const addMember = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = e.currentTarget.value.trim();

      if (!value) return;

      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      if (!emailPattern.test(value)) {
        // eslint-disable-next-line no-alert
        alert('유효한 이메일 주소를 입력하세요.');
        return;
      }
      setInvitedEmails((prev) => [...prev, value]);
      e.currentTarget.value = '';
    }
  };

  const deleteMember = (deletedEmail: string) => {
    const updatedMembers = invitedEmails.filter((email) => email !== deletedEmail);
    setInvitedEmails(updatedMembers);
  };

  const handleSubmit = async () => {
    // TODO: 백엔드로 POST 요청
    const requestData = {
      title: planInfo.title,
      intro: planInfo.intro,
      invitedEmails,
      isPublic,
    };
    // console.log(requestData);

    try {
      const { status, data } = await axios.post('/api/plans', requestData);
      if (status === 201) {
        navigate(`/plan/${data.id}`);
      } else {
        throw new Error();
      }
    } catch (error) {
      // eslint-disable-next-line
      alert('플랜이 정상적으로 만들어지지 않았어요 :(');
    }

    return requestData;
  };

  return (
    <Wrapper>
      <Title>새로운 플랜</Title>
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

      <BottomContainer>
        <ManageTeamContainer>
          <InputField>
            <label htmlFor="members">
              팀원 초대
              <input
                type="email"
                id="members"
                name="members"
                className="email"
                onKeyUp={addMember}
                placeholder="초대할 팀원의 이메일을 알려주세요"
              />
            </label>
          </InputField>
          <ManageTeam type="create" newMemberEmailList={invitedEmails} handleDeleteNewMember={deleteMember} />
        </ManageTeamContainer>
        <ImageContainer src={boardIllust} alt="member-illust" />
      </BottomContainer>

      <PublicContainer>
        <ToggleSwitch isPublic={isPublic} onChange={togglePublic} />
        <p> {isPublic ? '플랜을 공개합니다.' : '플랜을 공개하지 않습니다.'}</p>
      </PublicContainer>

      <Button type="button" onClick={handleSubmit}>
        생성하기
      </Button>
    </Wrapper>
  );
}

export default CreatePlan;
