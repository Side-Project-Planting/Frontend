import styled from 'styled-components';

export const Wrapper = styled.form`
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
  width: 10rem;
  font-size: 14px;
  height: 2.4rem;
  padding-inline: 1.5rem;
  border: none;
  border-radius: 0.5rem;
  color: #fff;
  background-color: #64d4ab;
  margin-top: 2rem;
`;

export const PublicContainer = styled.div`
  display: flex;
  align-items: center;

  p {
    margin-left: 1rem;
    color: gray;
  }
`;
