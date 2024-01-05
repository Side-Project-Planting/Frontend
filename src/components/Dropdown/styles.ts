import styled from 'styled-components';

export const Container = styled.div<{ type: string }>`
  ${(props) =>
    props.type === 'tab' &&
    `
    position: absolute;
    right: 0.8rem;
  `}

  height: 100%;
  display: flex;
  align-items: center;
`;

export const ProfileImg = styled.img`
  width: 2rem;
  height: 2rem;
  aspect-ratio: 1/1;
  border-radius: 50%;
  cursor: pointer;
`;

export const EditButton = styled.button`
  position: absolute;
  top: 0.4rem;
  right: 0;
`;

export const DropdownList = styled.ul<{ type: string }>`
  position: absolute;
  top: 3rem;
  right: 2.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #efefef;
  border-radius: 8px;
  background-color: white;
  ${(props) =>
    props.type === 'tab' &&
    `
    width: 5rem;
    top: 1.4rem;
    right: -0.8rem;
    z-index: 10;
  `}
`;

export const DropdownItem = styled.li`
  width: 100%;
  padding: 0.5rem;
  font-size: 0.8rem;
  text-align: center;
  cursor: pointer;

  &:first-child {
    border-bottom: 1px solid #efefef;
  }
`;
