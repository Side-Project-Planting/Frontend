import React, { useState, useRef } from 'react';
import { styled } from 'styled-components';
import Logo from '../components/Logo';
import plus from '../assets/images/plus.svg';
import defaultProfileImg from '../assets/images/defaultProfileImg.svg';

const MainWrapper = styled.div`
  min-height: 100dvh;
  padding-block: 3rem;
  display: flex;
  gap: 4rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;
`;

const ProfileImageContainer = styled.div`
  width: 250px;
  height: 250px;
  position: relative;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

const AddImageButton = styled.button`
  position: absolute;
  bottom: 4%;
  right: 4%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #64d4ab;
  border-radius: 50%;
  border: 5px solid #ffffff;
`;

const InputContainer = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  padding: 1rem;
  color: #30333e;
  background-color: #f5f5f5;
  border-radius: 0.8rem;
  outline: none;
`;

const SubmitButton = styled.button`
  width: 216px;
  height: 50px;
  border-radius: 0.8rem;
  color: #fafafa;
  background-color: #64d4ab;
  font-weight: 700;
`;

export default function SignUp() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const blobUrl = URL.createObjectURL(file);
    setImagePreview(blobUrl);
  };

  const handleButtonClick = () => {
    // 커스텀 버튼 클릭 시 input 요소를 클릭합니다.
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 서버에 회원가입 POST 요청
  };

  return (
    <MainWrapper>
      <Logo />
      <Form onSubmit={handleSubmit}>
        <ProfileImageContainer>
          <ProfileImage src={imagePreview || defaultProfileImg} alt="preview" />
          <input type="file" accept="image/*" onChange={uploadImage} style={{ display: 'none' }} ref={inputRef} />
          <AddImageButton type="button" onClick={handleButtonClick}>
            <img src={plus} alt="plus-icon" />
          </AddImageButton>
        </ProfileImageContainer>
        <InputContainer>
          <Input type="text" placeholder="이름" readOnly />
          <Input type="text" placeholder="이메일" readOnly />
        </InputContainer>
        <SubmitButton type="submit">시작하기</SubmitButton>
      </Form>
    </MainWrapper>
  );
}
