import styled from 'styled-components';

export const Wrapper = styled.li`
  width: 20rem;
  margin-right: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
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
    width: calc(100% - 0.8rem);
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

export const TaskList = styled.ul`
  border-radius: 1.1rem;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  width: 100%;
  /* 태스크 droppable 영역 크기 리팩토링 필요함 */
  height: calc(100% - 6rem);
  padding: 1rem;
  overflow-y: auto;
`;

export const AddButton = styled.button`
  width: 100%;
  height: 3rem;
  border-radius: 0.5rem;
  background-color: #fafafa;
  color: #8993a1;
  font-weight: 600;
`;
