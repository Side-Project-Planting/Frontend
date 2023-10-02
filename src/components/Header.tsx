import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { MdHome, MdCalendarMonth } from 'react-icons/md';
import { ImCompass2 } from 'react-icons/im';
import Logo from './Logo';
import defaultProfileImg from '../assets/images/defaultProfileImg.svg';

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

const LogoLink = styled(Link)`
  height: 100%;
  display: flex;
  align-items: center;
  text-decoration: none;
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

const NavLink = styled(Link)<{ isSelected: boolean }>`
  display: block;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  /* 선택된 메뉴에 대한 스타일링 */
  ${(props) =>
    props.isSelected &&
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

const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  aspect-ratio: 1/1;
  border-radius: 50%;
`;

// TODO: navMenu link 수정
const navMenu = [
  { id: 1, value: 'home', icon: MdHome, link: '/#' },
  { id: 2, value: 'plan', icon: MdCalendarMonth, link: '/#' },
  { id: 3, value: 'explore', icon: ImCompass2, link: '/#' },
];

function Header() {
  const [selectedMenu, setSelectedMenu] = useState<string>('home');

  const isSelected = (value: string) => {
    if (selectedMenu === value) return true;
    return false;
  };

  return (
    <HeadeContainerr>
      <LogoLink to="/">
        <Logo />
      </LogoLink>
      <Nav>
        {navMenu.map((item) => (
          <NavItem key={item.id}>
            <NavLink to={item.link} isSelected={isSelected(item.value)} onClick={() => setSelectedMenu(item.value)}>
              <item.icon size="30" color={`${isSelected(item.value) ? '#64d4ab' : '#999999 '}`} />
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      <ProfileImg src={defaultProfileImg} alt="profile-img" />
    </HeadeContainerr>
  );
}

export default Header;
