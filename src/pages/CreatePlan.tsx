import React from 'react';
import styled from 'styled-components';
import member from '../assets/images/member.svg';
import ToggleSwitch from '../components/ToggleSwitch';

const Wrapper = styled.div`
  height: 100vh;
  padding: 100px 70px 70px;
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
    width: 100%;
    padding: 1rem;
    margin-top: 8px;
    border-radius: 8px;
    background-color: #fafafa;

    &:focus {
      outline: 0.5px solid #64d4ab44;
    }
  }
`;

const BottomContainer = styled.div`
  height: 480px;
  display: flex;
  justify-content: space-between;
`;

const InviteContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;

  p {
    font-size: 18px;
    font-weight: bold;
  }
`;

const ImageContainer = styled.img`
  max-width: 530px;
`;

const MemberContainer = styled.div`
  width: 530px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;

  p {
    font-size: 1rem;
    font-weight: regular;
    color: #76808e;
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

function CreatePlan() {
  return (
    <Wrapper>
      <FormContainer>
        <InputField>
          <legend className="label">플랜 이름</legend>
          <input type="text" required id="planTitle" placeholder="플랜 이름을 알려주세요" aria-label="plan-title" />
        </InputField>
        <InputField>
          <legend className="label">플랜 설명</legend>
          <input
            type="text"
            required
            id="planDescription"
            placeholder="플랜에 대해 알려주세요"
            aria-label="plan-description"
          />
        </InputField>

        <BottomContainer>
          <InviteContainer>
            <p>함께 할 팀원</p>
            <InputField>
              <legend>팀원 초대</legend>
              <input
                type="email"
                id="inviteEmail"
                placeholder="초대할 팀원의 이메일을 알려주세요"
                aria-label="invite-email"
              />
            </InputField>
            <MemberContainer>
              <p>초대할 팀원 목록</p>
              <MemberList>
                <li>go1ruf2tk3@gmail.com</li>
                <li>go1ruf2tk3@gmail.com</li>
                <li>go1ruf2tk3@gmail.com</li>
              </MemberList>
            </MemberContainer>
          </InviteContainer>
          <ImageContainer src={member} alt="member-illust" />
        </BottomContainer>
        <ToggleSwitch />
        <Button type="submit">생성하기</Button>
      </FormContainer>
    </Wrapper>
  );
}

export default CreatePlan;
