import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import Logo from './Logo';
import defaultProfileImg from '../assets/images/defaultProfileImg.svg';
import home from '../assets/icons/home.svg';
import calender from '../assets/icons/calender.svg';
import compass from '../assets/icons/compass.svg';

const HeadeContainerr = styled.header`
  width: 100%;
  height: 60px;
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
  width: 60px;
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
      width: 42px;
      height: 42px;
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
  width: 42px;
  height: 42px;
  aspect-ratio: 1/1;
  border-radius: 50%;
`;

// TODO: navMenu link 수정
const navMenu = [
  { id: 1, value: 'home', iconUrl: home, link: '/#' },
  { id: 2, value: 'plan', iconUrl: calender, link: '/#' },
  { id: 3, value: 'explore', iconUrl: compass, link: '/#' },
];

function Header() {
  const [selectedMenu, setSelectedMenu] = useState<string>('home');
  return (
    <HeadeContainerr>
      <LogoLink to="/">
        <Logo />
      </LogoLink>
      <Nav>
        {navMenu.map((item) => (
          <NavItem key={item.id}>
            <NavLink
              to={item.link}
              isSelected={selectedMenu === item.value}
              onClick={() => setSelectedMenu(item.value)}
            >
              <img src={item.iconUrl} alt="nav-menu-icon" />
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      <ProfileImg src={defaultProfileImg} alt="profile-img" />
    </HeadeContainerr>
  );
}

export default Header;
