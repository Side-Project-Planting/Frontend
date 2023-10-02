import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { MdHome, MdCalendarMonth } from 'react-icons/md';
import { ImCompass2 } from 'react-icons/im';
import Logo from './Logo';
import Dropdown from './Dropdown';

const HeadeContainerr = styled.header`
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
`;

const Nav = styled.ul`
  width: 300px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavItem = styled.li`
  height: 100%;
  width: 70px;
`;

const NavLink = styled(Link)<{ selected: boolean }>`
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

// TODO: navMenu link 수정
const navMenu = [
  { id: 1, value: 'home', icon: MdHome, link: '/#' },
  { id: 2, value: 'plan', icon: MdCalendarMonth, link: '/#' },
  { id: 3, value: 'explore', icon: ImCompass2, link: '/#' },
];

const dropdownOptions = [
  { id: 1, label: '프로필 변경', value: 'profile' },
  { id: 2, label: '로그아웃', value: 'logout' },
];

function Header() {
  const [selectedMenu, setSelectedMenu] = useState<string>('home');

  const isSelected = (value: string): boolean => {
    if (selectedMenu === value) return true;
    return false;
  };

  return (
    <HeadeContainerr>
      <Logo />

      <Nav>
        {navMenu.map((item) => (
          <NavItem key={item.id}>
            <NavLink to={item.link} selected={isSelected(item.value)} onClick={() => setSelectedMenu(item.value)}>
              <item.icon size="30" color={`${isSelected(item.value) ? '#64d4ab' : '#999999 '}`} />
            </NavLink>
          </NavItem>
        ))}
      </Nav>

      <Dropdown options={dropdownOptions} />
    </HeadeContainerr>
  );
}

export default Header;
