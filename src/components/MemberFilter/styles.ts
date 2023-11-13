import styled from 'styled-components';

export const Memberlist = styled.ul`
  width: fit-content;
  height: 3rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const MemberItem = styled.li`
  cursor: pointer;
  position: relative;

  &:hover {
    .tooltip {
      display: block;
    }
  }
`;

export const MemberImg = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  &.selected {
    border: 3px solid #64d4ab;
  }
`;

export const Tooltip = styled.span`
  display: none;
  position: absolute;
  bottom: -1.2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 3.2rem;
  padding: 2px 5px;
  text-align: center;
  border-radius: 5px;
  font-size: 0.8em;
  color: #fff;
  background: #494b5a;
`;
