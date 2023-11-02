import React, { useState } from 'react';

import styled from 'styled-components';

import boardIllust from '@assets/images/boardIllust.svg';
import InputField from '@components/InputField';
import ManageTeam from '@components/ManageTeam';
import ToggleSwitch from '@components/ToggleSwitch';

const Wrapper = styled.form`
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
const BottomContainer = styled.div`
  width: 75rem;
  max-height: 450px;
  display: flex;
  align-items: flex-end;
`;

const ImageContainer = styled.img`
  width: 45%;
  max-height: 340px;
`;

const ManageTeamContainer = styled.div`
  width: 45%;
  height: 350px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-right: 48px;

  p.label {
    font-size: 18px;
    font-weight: bold;
  }
`;

const Button = styled.button`
  align-self: center;
  width: 10rem;
  font-size: 14px;
  height: 2.4rem;
  padding-inline: 1.5rem;
  border: none;
  border-radius: 0.5rem;
  color: #fff;
  background-color: #64d4ab;
`;

const PublicContainer = styled.div`
  display: flex;
  align-items: center;

  p {
    margin-left: 1rem;
    color: gray;
  }
`;

type PlanInfo = {
  title: string;
  description: string;
};

function CreatePlan() {
  const [planInfo, setPlanInfo] = useState<PlanInfo>({
    title: '',
    description: '',
  });

  const [memberEmailList, setMemberEmailList] = useState<string[]>([]);

  const [isPublic, setIsPublic] = useState<boolean>(false);

  const changePlanInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPlanInfo((prev) => ({ ...prev, [name]: value }));
  };

  const togglePublic = () => {
    setIsPublic((prev) => !prev);
  };

  const addMember = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = e.currentTarget.value.trim();

      if (!value) return;

      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      if (!emailPattern.test(value)) {
        // eslint-disable-next-line no-alert
        alert('유효한 이메일 주소를 입력하세요.');
        return;
      }
      setMemberEmailList((prev) => [...prev, value]);
      e.currentTarget.value = '';
    }
  };

  const deleteMember = (deletedEmail: string) => {
    const updatedMembers = memberEmailList.filter((email) => email !== deletedEmail);
    setMemberEmailList(updatedMembers);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 백엔드로 POST 요청
  };

  return (
    <Wrapper onSubmit={handleSubmit}>
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
          <ManageTeam type="create" newMemberEmailList={memberEmailList} handleDeleteNewMember={deleteMember} />
        </ManageTeamContainer>
        <ImageContainer src={boardIllust} alt="member-illust" />
      </BottomContainer>

      <PublicContainer>
        <ToggleSwitch isPublic={isPublic} onChange={togglePublic} />
        <p> {isPublic ? '플랜을 공개합니다.' : '플랜을 공개하지 않습니다.'}</p>
      </PublicContainer>

      <Button type="submit">생성하기</Button>
    </Wrapper>
  );
}

export default CreatePlan;
