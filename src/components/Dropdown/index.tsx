import React, { useRef, useState, useEffect } from 'react';

import { IoIosMore } from 'react-icons/io';

import { Container, ProfileImg, EditButton, DropdownList, DropdownItem } from './styles';

import defaultProfileImg from '@assets/images/defaultProfileImg.svg';

type DropdownOption = {
  id: number;
  label: string;
  value: string;
};

type DropdownProp = {
  type: 'header' | 'tab';
  options: DropdownOption[];
  onClick: (value: string) => void;
};

function Dropdown({ type, options, onClick }: DropdownProp) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const profileUrl = localStorage.getItem('profileUrl');

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleOptionClick = (value: string) => {
    setIsOpen(false);
    // TODO : onClick함수가 value에 따라 다른 일을 하도록 수정
    onClick(value);
  };

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <Container ref={dropdownRef} type={type}>
      {type === 'header' && (
        <ProfileImg src={profileUrl || defaultProfileImg} alt="profile-img" onClick={toggleDropdown} />
      )}
      {type === 'tab' && (
        <EditButton onClick={toggleDropdown}>
          <IoIosMore size="24" />
        </EditButton>
      )}
      {isOpen && (
        <DropdownList type={type}>
          {options.map((option: DropdownOption) => (
            <DropdownItem key={option.id} onClick={() => handleOptionClick(option.value)}>
              {option.label}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </Container>
  );
}

export default Dropdown;
