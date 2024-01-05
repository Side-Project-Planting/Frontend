import styled from 'styled-components';

export const Wrapper = styled.form`
  width: 100vw;
  min-height: 100vh;
  padding: 70px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Title = styled.h2`
  font-size: 1.1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgb(216, 222, 228);
`;
export const BottomContainer = styled.div`
  width: 75rem;
  max-height: 450px;
  display: flex;
  align-items: flex-end;
`;

export const ImageContainer = styled.img`
  width: 45%;
  max-height: 340px;
`;

export const ManageTeamContainer = styled.div`
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

export const Button = styled.button`
  align-self: center;
  width: 8rem;
  height: 2.5rem;
  font-size: 14px;
  border: none;
  border-radius: 0.5rem;
  color: #fff;
  font-weight: 600;
  background-color: #64d4ab;
`;

export const PublicContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: -0.5rem;

  p {
    margin-left: 0.5rem;
    font-size: 14px;
    color: gray;
  }
`;
