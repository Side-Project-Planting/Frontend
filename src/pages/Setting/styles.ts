import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  padding: 110px 70px 40px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgb(216, 222, 228);
`;

export const ManageTeamContainer = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h3 {
    font-weight: 600;
  }
`;

export const ButtonContainer = styled.div`
  align-self: center;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Button = styled.button`
  font-size: 14px;
  height: 2.4rem;
  padding-inline: 1.5rem;
  border: none;
  border-radius: 0.5rem;
  color: #fff;

  &.save {
    background-color: #64d4ab;
  }

  &.delete {
    background-color: #ff5353;
  }
`;

export const ImportantSetting = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 14px;

  h3 {
    font-size: 1rem;
    font-weight: 600;
  }
`;

export const SettingItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
