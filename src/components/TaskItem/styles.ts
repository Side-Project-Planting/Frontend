import styled from 'styled-components';

export const ItemWrapper = styled.div`
  position: relative;
  width: 100%;

  &:hover .task-remove-button {
    display: flex;
  }
`;
export const ItemContainer = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  width: 99%;
  min-height: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fdfdfd;
  border-radius: 10px;
  box-shadow: 1px 1px 1px 2px rgba(0, 0, 0, 0.1);

  #task-title {
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
  border-radius: 5px;
  color: white;
  font-size: 0.7rem;
  text-align: center;
  background-color: ${(prop) => prop.color};
`;

export const InfoField = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const DateField = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  line-height: 110%;

  .date-infinity {
    width: 2rem;
    display: flex;
    justify-content: center;
  }
`;
