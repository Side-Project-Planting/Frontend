import React, { useState, useRef } from 'react';
import { styled } from 'styled-components';
import Logo from '../components/Logo';

const MainWrapper = styled.div`
  min-height: 100dvh;
  display: flex;
  gap: 4rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
    // TODO: 서버에 로그인 POST 요청
  };

  return (
    <MainWrapper>
      <Logo />
      <form onSubmit={handleSubmit}>
        {imagePreview && <img src={imagePreview} alt="" />}
        <input type="file" accept="image/*" onChange={uploadImage} style={{ display: 'none' }} ref={inputRef} />
        <button type="button" onClick={handleButtonClick}>
          +
        </button>
        <input type="text" placeholder="이름" readOnly />
        <input type="text" placeholder="이메일" readOnly />
        <button type="submit">시작하기</button>
      </form>
    </MainWrapper>
  );
}
