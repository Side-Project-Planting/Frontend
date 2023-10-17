import React, { useRef, useState, useEffect } from 'react';

import { IoIosMore } from 'react-icons/io';
import styled from 'styled-components';

import defaultProfileImg from '@assets/images/defaultProfileImg.svg';

type DropdownOption = {
  id: number;
  label: string;
  value: string;
};

type DropdownProp = {
  type: 'header' | 'tab';
  options: DropdownOption[];
  onClick: () => void;
};

const Container = styled.div<{ type: string }>`
  ${(props) =>
    props.type === 'tab' &&
    `
      position: absolute;
      right: 0.8rem;
  `}
`;

const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  cursor: pointer;
`;

const EditButton = styled.button``;

const DropdownList = styled.ul<{ type: string }>`
  position: absolute;
  top: 80px;
  right: 38px;
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
    top: 2rem;
    right: -0.8rem;
    z-index: 10;
  `}
`;

const DropdownItem = styled.li`
  width: 100%;
  padding: 1rem;
  text-align: center;
  cursor: pointer;

  &:first-child {
    border-bottom: 1px solid #efefef;
  }
`;

function Dropdown({ type, options, onClick }: DropdownProp) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

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

    if (value === 'delete') onClick();
  };

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <Container ref={dropdownRef} type={type}>
      {type === 'header' && <ProfileImg src={defaultProfileImg} alt="profile-img" onClick={toggleDropdown} />}
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
