import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import defaultProfileImg from '../assets/images/defaultProfileImg.svg';

type DropdownOption = {
  id: number;
  label: string;
  value: string;
};

type DropdownProp = {
  options: DropdownOption[];
};

const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  cursor: pointer;
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 80px;
  right: 38px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #efefef;
  border-radius: 8px;
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

function Dropdown({ options }: DropdownProp) {
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

  const handleOptionClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div ref={dropdownRef}>
      <ProfileImg src={defaultProfileImg} alt="profile-img" onClick={toggleDropdown} />
      {isOpen && (
        <DropdownList>
          {options.map((option: DropdownOption) => (
            <DropdownItem key={option.id} onClick={handleOptionClick}>
              {option.label}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </div>
  );
}

export default Dropdown;
