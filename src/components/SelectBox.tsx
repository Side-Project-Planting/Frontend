import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import styled from 'styled-components';

const SelectBoxContainer = styled.div`
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

const Selected = styled.label`
  font-size: 14px;
  margin-left: 4px;
  width: 4rem;
  text-align: center;
`;

const SelectOptions = styled.ul`
  position: absolute;
  list-style: none;
  top: 2rem;
  left: 0;
  width: 100%;
  overflow: hidden;
  padding: 0;
  border-radius: 8px;
  background-color: #fafafa;
`;

const Option = styled.li`
  font-size: 14px;
  padding: 6px 8px;
  text-align: center;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: #64d4ab;
  }
`;

const SelectBoxArrowContainer = styled.div`
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SelectBoxArrow = styled.svg<{ $showOptions: boolean }>`
  transition-duration: 0.3s;
  transform: rotate(${(props) => (props.$showOptions ? '180deg' : 0)});
`;

interface SelectOption {
  value: string;
  label: string;
}

interface Props {
  options: SelectOption[];
  setValue: Dispatch<SetStateAction<string>>;
}

export default function SelectBox({ options, setValue }: Props) {
  const [selectedValue, setSelectedValue] = useState<SelectOption>(options[0]);
  const [showOptions, setShowOptions] = useState<boolean>(false);

  useEffect(() => {
    setValue(options[0].value);
  }, [setValue]);

  return (
    <SelectBoxContainer onClick={() => setShowOptions((prev) => !prev)}>
      <Selected>{selectedValue.label}</Selected>
      {showOptions && (
        <SelectOptions>
          {options.map((option) => (
            <Option
              key={option.value}
              value={option.value}
              onClick={() => {
                setSelectedValue(option);
                setValue(option.value);
              }}
            >
              {option.label}
            </Option>
          ))}
        </SelectOptions>
      )}
      <SelectBoxArrowContainer>
        <SelectBoxArrow
          $showOptions={showOptions}
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          height="6"
          viewBox="0 0 11 6"
          fill="none"
        >
          <path d="M0.291664 0.416748L5.5 5.62508L10.7083 0.416748H0.291664Z" fill="#8993A1" />
        </SelectBoxArrow>
      </SelectBoxArrowContainer>
    </SelectBoxContainer>
  );
}
