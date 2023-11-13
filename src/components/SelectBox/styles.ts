import styled from 'styled-components';

export const SelectBoxContainer = styled.div`
  position: relative;
  width: 6rem;
  height: 2rem;
  display: flex;
  border-radius: 8px;
  background-color: #fafafa;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;
`;

export const Selected = styled.label`
  font-size: 14px;
  margin-left: 4px;
  width: 4rem;
  text-align: center;
`;

export const SelectOptions = styled.ul`
  position: absolute;
  list-style: none;
  top: 2rem;
  left: 0;
  width: 100%;
  overflow: hidden;
  padding: 0;
  border-radius: 8px;
  background-color: #fafafa;
  z-index: 100;
`;

export const Option = styled.li`
  font-size: 14px;
  padding: 6px 8px;
  text-align: center;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: #64d4ab;
  }
`;

export const SelectBoxArrowContainer = styled.div`
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SelectBoxArrow = styled.svg<{ $showOptions: boolean }>`
  transition-duration: 0.3s;
  transform: rotate(${(props) => (props.$showOptions ? '180deg' : 0)});
`;
