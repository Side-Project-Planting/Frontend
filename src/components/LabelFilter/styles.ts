import styled from 'styled-components';

export const Container = styled.div`
  width: 11rem;
  height: 50%;
  border-radius: 1rem;
  padding: 1rem;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  background-color: #ffffff;
  overflow-y: auto;
`;

export const LabelList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  li {
    display: flex;
    align-items: center;

    input {
      margin: 0 1rem 0 0;
    }
  }
`;
