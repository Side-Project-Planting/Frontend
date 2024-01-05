import React, { useState, useEffect } from 'react';

import { AiOutlineHome } from 'react-icons/ai';
import { ImCompass2 } from 'react-icons/im';
import { LuCalendarPlus, LuCalendarDays } from 'react-icons/lu';
import { useLocation } from 'react-router-dom';

import { Container, Nav, NavItem, NavLink } from './styles';

import Dropdown from '@components/Dropdown';
import Logo from '@components/Logo/Logo';

// TODO: navMenu link 수정
const navMenu = [
  { id: 1, value: 'main', icon: AiOutlineHome, link: '/main' },
  { id: 2, value: 'create-plan', icon: LuCalendarPlus, link: '/create-plan' },
  { id: 3, value: 'plan', icon: LuCalendarDays, link: '/plan' },
  { id: 4, value: 'explore', icon: ImCompass2, link: '/#' },
];

const dropdownOptions = [
  { id: 1, label: '프로필 변경', value: 'profile' },
  { id: 2, label: '로그아웃', value: 'logout' },
];

function Header() {
  const [selectedMenu, setSelectedMenu] = useState<string>('main');
  const location = useLocation();

  useEffect(() => {
    const pathSegments = location.pathname.split('/');
    const currentPath = pathSegments[1];

    setSelectedMenu(currentPath);
  }, [location]);

  const isSelected = (value: string): boolean => {
    if (selectedMenu === value) return true;
    return false;
  };

  const handleDropdownClick = () => {};

  return (
    <Container>
      <Logo />

      <Nav>
        {navMenu.map((item) => (
          <NavItem key={item.id}>
            <NavLink to={item.link} selected={isSelected(item.value)} onClick={() => setSelectedMenu(item.value)}>
              <item.icon size="20" color={`${isSelected(item.value) ? '#64d4ab' : '#999999 '}`} />
            </NavLink>
          </NavItem>
        ))}
      </Nav>

      <Dropdown type="header" options={dropdownOptions} onClick={handleDropdownClick} />
    </Container>
  );
}

export default Header;
