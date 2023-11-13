import styled from 'styled-components';

export const MainWrapper = styled.div`
  min-height: 100dvh;
  padding-block: 3rem;
  display: flex;
  gap: 4rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;
`;

export const ProfileImageContainer = styled.div`
  width: 250px;
  height: 250px;
  position: relative;
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

export const AddImageButton = styled.button`
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

export const InputContainer = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

export const Input = styled.input`
  width: 100%;
  height: 50px;
  padding: 1rem;
  color: #30333e;
  background-color: #f5f5f5;
  border-radius: 0.8rem;
  outline: none;
`;

export const SubmitButton = styled.button`
  width: 216px;
  height: 50px;
  border-radius: 0.8rem;
  color: #fafafa;
  background-color: #64d4ab;
  font-weight: 700;
`;
