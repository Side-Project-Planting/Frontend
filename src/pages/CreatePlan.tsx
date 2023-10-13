
import React, { useState } from 'react';

import { MdOutlineClose } from 'react-icons/md';
import styled from 'styled-components';

import boardIllust from '@assets/images/boardIllust.svg';
import ToggleSwitch from '@components/ToggleSwitch';

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  padding: 110px 70px 40px;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const InputField = styled.div`
  label {
    font-weight: 600;
  }

  input {
    display: block;
    width: 100%;
    padding: 1rem;
    margin-top: 8px;
    border-radius: 8px;
    background-color: #fafafa;

    &:focus {
      outline: 1px solid #b8b8b84f;
    }
  }
`;

const BottomContainer = styled.div`
  width: calc(100vw - 140px);
  max-height: 450px;
  display: flex;
  align-items: flex-end;
`;

const ImageContainer = styled.img`
  width: 45%;
  max-height: 340px;
`;

const InviteContainer = styled.div`
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

const MemberList = styled.ul`
  width: 100%;
  height: 300px;
  border-radius: 8px;
  padding: 1.5rem 1rem;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: scroll;
`;

const MemberItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    background-color: inherit;
  }
`;

const Button = styled.button`
  align-self: center;
  width: 216px;
  height: 50px;
  border-radius: 8px;
  color: #fafafa;
  background-color: #64d4ab;
  font-weight: 700;
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
    const value = e.currentTarget.value.trim();
    if (e.key !== 'Enter' || !value) return;
    setMemberEmailList((prev) => [...prev, value]);
    e.currentTarget.value = '';
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
    <Wrapper>
      <FormContainer onSubmit={handleSubmit}>
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
          <InviteContainer>
            <InputField>
              <label htmlFor="members">
                팀원 초대
                <input
                  type="email"
                  id="members"
                  name="members"
                  onKeyUp={addMember}
                  placeholder="초대할 팀원의 이메일을 알려주세요"
                />
              </label>
            </InputField>
            <MemberList>
              {memberEmailList.map((item) => (
                <MemberItem key={item}>
                  {item}
                  <button type="button" onClick={() => deleteMember(item)}>
                    <MdOutlineClose size="18" color="red" />
                  </button>
                </MemberItem>
              ))}
            </MemberList>
          </InviteContainer>
          <ImageContainer src={boardIllust} alt="member-illust" />
        </BottomContainer>

        <PublicContainer>
          <ToggleSwitch isPublic={isPublic} onChange={togglePublic} />
          <p> {isPublic ? '플랜을 공개합니다.' : '플랜을 공개하지 않습니다.'}</p>
        </PublicContainer>

        <Button type="submit">생성하기</Button>
      </FormContainer>
    </Wrapper>
  );
}

export default CreatePlan;
