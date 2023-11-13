import styled from 'styled-components';

export const LabelContainer = styled.li<{ height: number; color: string }>`
  list-style: none;
  position: relative;
  padding: 0.5rem 1rem;
  height: ${(prop) => prop.height}rem;
  border-radius: 10px;
  color: white;
  text-align: center;
  line-height: 110%;
  background-color: ${(prop) => prop.color};

  button {
    display: none;
    width: 1rem;
    height: 1rem;
    position: absolute;
    bottom: 1rem;
    right: -0.3rem;
    color: #f44336;
    background-color: white;
    border: 1px solid lightgray;
    border-radius: 50%;
    line-height: 110%;
  }
  &:hover button {
    display: flex;
  }
`;
