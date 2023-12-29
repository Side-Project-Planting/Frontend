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
  height: calc(100% - 3rem);
  margin-right: 1.5rem;
  border-radius: 1.1rem;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

export const TaskList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* 태스크 droppable 영역 크기 리팩토링 필요함 */
  min-height: 38rem;
  overflow-y: auto;
`;

export const AddButton = styled.button`
  width: 100%;
  height: 3rem;
  margin-top: 1rem;
  border-radius: 0.5rem;
  background-color: #fafafa;
  color: #8993a1;
  font-weight: 600;
`;

export const TabDragBar = styled.button`
  width: 95%;
  height: 0.5rem;
  background-color: lightgray;
  border-radius: 15px;
`;
