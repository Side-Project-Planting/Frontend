import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.header`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  padding-inline: 70px;
  border-bottom: 1px solid #f5f5f7;
  background-color: #ffffff;
  z-index: 10;
`;

export const Nav = styled.ul`
  width: 300px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NavItem = styled.li`
  height: 100%;
  width: 70px;
`;

export const NavLink = styled(Link)<{ selected: boolean }>`
  display: block;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  /* 선택된 메뉴에 대한 스타일링 */
  ${(props) =>
    props.selected &&
    `
    &::after {
      content: '';
      position: absolute;
      width: 50px;
      height: 50px;
      top: 50%;
      left: 50%;
      border-radius: 8px;
      transform: translate(-50%, -50%);
      background-color: #64d4ab;
      opacity: 0.11;
    }
  `}
`;
