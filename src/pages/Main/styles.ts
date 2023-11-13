import styled from 'styled-components';

export const Wrapper = styled.main`
  width: 100dvw;
  height: 100dvh;
  padding: 70px 0 0 0;
  background-clip: content-box;
  background-color: #fafafa;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 3rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Plans = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  overflow-x: scroll;
`;

export const TeamPlanTabs = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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
