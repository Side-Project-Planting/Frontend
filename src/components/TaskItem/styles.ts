import styled from 'styled-components';

export const ItemWrapper = styled.div`
  position: relative;
  width: 100%;

  &:hover .task-remove-button {
    display: flex;
  }
`;
export const ItemContainer = styled.div`
  padding: 0.5rem;
  margin-bottom: 0.8rem;
  min-height: 4.5rem;
  background-color: #fdfdfd;
  border-radius: 0.5rem;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.2rem;

  .task-title {
    font-size: 14px;
    word-wrap: break-word;
  }

  &:hover {
    background-color: #ececec;
  }
`;

export const TaskRemoveButton = styled.button`
  display: none;
  width: 1rem;
  height: 1rem;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  color: #f44336;
`;

export const LabelField = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const LabelItem = styled.div<{ color: string }>`
  padding: 0.1rem 0.5rem;
  border-radius: 0.3rem;
  color: white;
  font-size: 0.7rem;
  text-align: center;
  background-color: ${(prop) => prop.color};
`;

export const InfoField = styled.div`
  display: flex;
  flex-direction: column;

  .assignee-id {
    font-size: 14px;
    font-weight: 600;
    color: #5b8b4f;
  }
`;

export const DateField = styled.div`
  font-size: 0.7rem;
  color: #939393;
  line-height: 110%;
`;
