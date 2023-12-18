import styled from 'styled-components';

export const Wrapper = styled.main`
  width: 100vw;
  min-height: 100vh;
  padding: 110px 70px 40px;
  display: flex;
  gap: 2rem;
  background-color: #f5f5f7;
`;

export const EmptyPlanContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const EmptyPlanContents = styled.div`
  margin-top: 3rem;
  width: 610px;
  height: 630px;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: #fdfdfd;

  p {
    font-size: 1.2rem;
  }
`;

export const SideContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
`;

export const PlanCategory = styled.ul`
  width: 11rem;
  height: 50%;
  border-radius: 1rem;
  padding: 2.5rem 1rem;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  overflow: auto;
  background-color: #ffffff;

  li {
    height: 3rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #8993a1;
    cursor: pointer;

    &.isSelected {
      background-color: #64d4ab;
      border-radius: 0.6rem;
      color: #ffffff;
    }
  }
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const TopContainer = styled.div`
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const UtilContainer = styled.div`
  display: flex;
  gap: 0.8rem;

  .icon {
    background-color: #ffffff;
    width: 2.8rem;
    height: 2.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    cursor: pointer;
  }
`;

export const TabGroup = styled.ul`
  /* width: calc(100vw - 22rem);
  height: calc(100% - 4rem); */
  display: flex;
  gap: 1.5rem;
`;

export const TabContainer = styled.div`
  width: calc(100vw - 22rem);
  height: calc(100% - 4rem);
  display: flex;
  /* gap: 1.5rem;
  overflow-x: auto; */
`;

export const AddTabButton = styled.button`
  height: 100%;
  background: none;
  margin-left: 5rem;
`;

export const TabWrapper = styled.li`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: space-between;
  position: relative;

  input {
    height: 2rem;
    background: none;
    padding: 0.2rem 0.5rem;

    &:focus {
      border: 2px solid #000000;
    }
  }

  .cancelTab {
    width: 100px;
    background-color: yellow;
    position: absolute;
    top: 4rem;
    left: 4rem;
    z-index: 10;
  }
`;
