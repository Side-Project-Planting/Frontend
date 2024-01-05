import styled from 'styled-components';

export const Wrapper = styled.li`
  width: 15rem;
  margin-right: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .planTitle {
    width: 100%;
    padding: 0.2rem 0.5rem;
    height: 2rem;
    font-size: 14px;
  }
`;

export const EditableTitle = styled.input`
  width: 100%;
  height: 2rem;
  padding: 0.2rem 0.5rem;
  border-radius: 0.5rem;
  background: none;
  font-size: 0.8rem;
  outline: none;

  &:focus {
    background-color: #ffffff;
    border: 1.5px solid #efefef;
  }
`;

export const TaskList = styled.ul`
  border-radius: 0.8rem;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  width: 100%;
  /* 태스크 droppable 영역 크기 리팩토링 필요함 */
  height: calc(100% - 6rem);
  padding: 0.8rem;
  overflow-y: auto;
`;

export const AddButton = styled.button`
  width: 100%;
  height: 2.5rem;
  border-radius: 0.5rem;
  margin-top: 0.5rem;
  background-color: #fafafa;
  color: #8993a1;
  font-weight: 500;
  font-size: 0.9rem;
`;
