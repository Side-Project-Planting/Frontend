import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import {
  Wrapper,
  Title,
  BottomContainer,
  ManageTeamContainer,
  ImageContainer,
  PublicContainer,
  Button,
} from './styles';

import { createPlan } from '@apis';
import boardIllust from '@assets/images/boardIllust.svg';
import InputField from '@components/InputField';
import ManageTeam from '@components/ManageTeam';
import ToggleSwitch from '@components/ToggleSwitch';
import { currentPlanIdState } from '@recoil/atoms';
import { authenticate } from '@utils/auth';

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
  const setCurrentPlanId = useSetRecoilState(currentPlanIdState);

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
    const requestBody = {
      title: planInfo.title,
      intro: planInfo.intro,
      invitedEmails,
      isPublic,
    };

    try {
      const { status, data } = await createPlan(requestBody);
      if (status === 201) {
        // setCurrentPlanId를 변경하지 않고 plan/data.id로 가는경우
        // 경로에 있는 data.id를 사용해서 데이터를 불러오지 않고
        // recoil에 이미 저장되어 있는 id의 플랜 정보를 불러온다.
        // 즉 플랜이 없다가 만들어진 경우
        // 이전 recoil에 currentPlanId가 없기 때문에
        // plan 페이지로 넘어갔을 떄 데이터를 받아오지 않는다.
        setCurrentPlanId(data.id);
        navigate(`/plan/${data.id}`);
      } else {
        throw new Error();
      }
    } catch (error) {
      // eslint-disable-next-line
      alert('플랜이 정상적으로 만들어지지 않았어요 :(');
    }

    return requestBody;
  };

  useEffect(() => {
    authenticate();
  }, []);

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
