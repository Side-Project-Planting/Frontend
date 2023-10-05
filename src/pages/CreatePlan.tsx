import React, { useState } from 'react';
import styled from 'styled-components';
import { MdOutlineClose } from 'react-icons/md';
import ToggleSwitch from '../components/ToggleSwitch';
import member from '../assets/images/member.svg';

const Wrapper = styled.div`
  min-height: 100vh;
  width: 80%;
  margin-inline: auto;
  padding-top: 110px;
  padding-bottom: 70px;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const InputField = styled.fieldset`
  legend.label {
    font-size: 18px;
    font-weight: bold;
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
  max-height: 480px;
  display: flex;
  align-items: flex-end;
`;

const InviteContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  margin-right: 50px;

  p.label {
    font-size: 18px;
    font-weight: bold;
  }
`;

const ImageContainer = styled.img``;

const MemberContainer = styled.div`
  width: 530px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MemberList = styled.ul`
  width: 100%;
  min-height: 260px;
  border-radius: 8px;
  padding: 1.5rem 1rem;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

  const [memberList, setMemberList] = useState<string[]>([]);

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
    setMemberList((prev) => [...prev, value]);
    e.currentTarget.value = '';
  };

  const deleteMember = (deletedEmail: string) => {
    const updatedMembers = memberList.filter((email) => email !== deletedEmail);
    setMemberList(updatedMembers);
  };

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // TODO: 백엔드로 POST 요청
  };

  return (
    <Wrapper>
      <FormContainer>
        <InputField>
          <legend className="label">플랜 이름</legend>
          <input
            type="text"
            id="planTitle"
            name="title"
            value={planInfo.title}
            onChange={changePlanInfo}
            placeholder="플랜 이름을 알려주세요"
            aria-label="plan-title"
          />
        </InputField>
        <InputField>
          <legend className="label">플랜 설명</legend>
          <input
            type="text"
            id="planDescription"
            name="description"
            value={planInfo.description}
            onChange={changePlanInfo}
            placeholder="플랜에 대해 알려주세요"
            aria-label="plan-description"
          />
        </InputField>
        <BottomContainer>
          <InviteContainer>
            <p className="label">함께 할 팀원</p>
            <InputField>
              <legend>팀원 초대</legend>
              <input
                type="email"
                id="inviteEmail"
                name="members"
                onKeyUp={addMember}
                placeholder="초대할 팀원의 이메일을 알려주세요"
                aria-label="invite-email"
              />
            </InputField>
            <MemberContainer>
              <p>초대할 팀원 목록</p>
              <MemberList>
                {memberList.map((item) => (
                  <MemberItem key={item}>
                    {item}
                    <button type="button" onClick={() => deleteMember(item)}>
                      <MdOutlineClose size="18" color="red" />
                    </button>
                  </MemberItem>
                ))}
              </MemberList>
            </MemberContainer>
          </InviteContainer>
          <ImageContainer src={member} alt="member-illust" />
        </BottomContainer>
        <PublicContainer>
          <ToggleSwitch isPublic={isPublic} onChange={togglePublic} />
          <p> {isPublic ? '플랜을 공개합니다.' : '플랜을 공개하지 않습니다.'}</p>
        </PublicContainer>
        <Button type="submit" onSubmit={handleSubmit}>
          생성하기
        </Button>
      </FormContainer>
    </Wrapper>
  );
}

export default CreatePlan;
