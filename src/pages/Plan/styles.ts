import styled from 'styled-components';

export const Wrapper = styled.main`
  position: relative;
  width: 100vw;
  height: 100vh;
  padding: 70px 2rem 2rem;
  display: flex;
  gap: 1rem;
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
  gap: 1rem;
`;

export const PlanCategory = styled.ul`
  width: 10rem;
  height: 50%;
  border-radius: 0.8rem;
  padding: 1rem;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  overflow: auto;
  background-color: #ffffff;

  li {
    font-size: 0.9rem;
    height: 2.5rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #8993a1;
    cursor: pointer;

    &.isSelected {
      background-color: #64d4ab;
      border-radius: 0.5rem;
      color: #ffffff;
    }
  }
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-x: scroll;
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
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    cursor: pointer;
  }
`;

export const TabGroup = styled.ul`
  width: fit-content;
  height: calc(100% - 4rem);
  display: flex;
`;

export const AddTabButton = styled.button`
  height: 100%;
  background: none;
  margin-left: 5rem;
`;

export const TabWrapper = styled.li`
  width: 15rem;
  height: 100%;
  display: flex;
  flex-direction: column;

  input {
    height: 2rem;
    background: none;
    padding: 0.2rem 0.5rem;
    border-radius: 0.5rem;
    font-size: 14px;
    outline: none;

    &:focus {
      background-color: #ffffff;
      border: 1.5px solid #efefef;
    }
  }
`;
