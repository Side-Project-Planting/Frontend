import React, { useState, useRef } from 'react';

import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  MainWrapper,
  Form,
  ProfileImageContainer,
  AddImageButton,
  ProfileImage,
  InputContainer,
  Input,
  SubmitButton,
} from './styles';

import { registerUser } from '@apis';
import defaultProfileImg from '@assets/images/defaultProfileImg.svg';
import plus from '@assets/images/plus.svg';
import Logo from '@components/Logo/Logo';

export default function SignUp() {
  const location = useLocation();
  const userData = location.state;
  const [name, setName] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string | null>(userData.profileUrl);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requestBody = {
      profileUrl: userData.profileUrl,
      name,
      authId: userData.authId,
      authorizedToken: userData.authorizedToken,
    };

    // if (inputRef.current && inputRef.current.files) {
    //   requestData.profileImage = inputRef.current.files[0];
    // } else {
    //   requestData.profileUrl = userData.profileUrl;
    // }

    try {
      const { data } = await registerUser(requestBody);

      // TODO: 이후 보안을 생각해서 방식을 변경해야 함
      axios.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('profileUrl', data.profileUrl);
      navigate('/main');
    } catch {
      throw Error('회원가입에 실패했습니다.');
    }
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
          <Input type="text" placeholder="이름을 알려주세요" value={name} onChange={(e) => setName(e.target.value)} />
          <Input type="email" placeholder="이메일" value={userData.email} readOnly />
        </InputContainer>
        <SubmitButton type="submit">시작하기</SubmitButton>
      </Form>
    </MainWrapper>
  );
}
