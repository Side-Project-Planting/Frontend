import React, { useState, useRef, useEffect } from 'react';

type DropdownOption = {
  id: number;
  label: string;
  value: string;
};

type DropdownProp = { options: DropdownOption[] };

function Dropdown({ options }: DropdownProp) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  //   const handleOptionClick = () => {
  //     setIsOpen(false);
  //   };

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button type="button" className="dropdown-toggle" onClick={toggleDropdown}>
        Select an option
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option: DropdownOption) => (
            <li key={option.id}>{option.label}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
