import styled from 'styled-components';

export const Wrapper = styled.main`
  width: 100vw;
  height: 100vh;
  padding: 70px 2rem 2rem;
  display: flex;
  gap: 1rem;
  overflow-x: scroll;
  background-color: #f5f5f7;
`;

export const EmptyTeamPlanFrame = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  div {
    width: 640px;
    height: 710px;
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 4rem;
    align-items: center;
    justify-content: center;
    border-radius: 15px;

    p {
      font-size: 1.1rem;
      text-align: center;
      line-height: 150%;
    }
  }
`;
