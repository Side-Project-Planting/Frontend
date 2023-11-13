import styled from 'styled-components';

export const Wrapper = styled.li`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: space-between;
`;

export const Header = styled.div`
  padding-inline: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .planTitle {
    height: 2rem;
    padding-block: 0.2rem;
    width: calc(100% - 24px);
  }
`;

export const EditableTitle = styled.input`
  height: 2rem;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  background: none;
  font-size: 1rem;
  outline: none;
  width: 100%;

  &:focus {
    border: 3px solid #000000;
  }
`;

export const Container = styled.div`
  width: 20rem;
  height: calc(100% - 2rem);
  border-radius: 1.1rem;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const TaskList = styled.ul`
  margin: 0.5rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 38rem;
  overflow-y: auto;
`;

export const AddButton = styled.button`
  width: 17rem;
  height: 3rem;
  border-radius: 0.5rem;
  background-color: #fafafa;
  color: #8993a1;
  font-weight: 600;
`;

export const Interactions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`;

export const TabDragBar = styled.button`
  width: 95%;
  height: 0.5rem;
  background-color: lightgray;
  border-radius: 15px;
`;
