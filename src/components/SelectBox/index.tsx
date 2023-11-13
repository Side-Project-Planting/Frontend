/* eslint-disable react/require-default-props */
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { ISelectOption } from 'types';

import { SelectBoxContainer, SelectOptions, Selected, Option, SelectBoxArrowContainer, SelectBoxArrow } from './styles';

interface Props {
  options: ISelectOption[];
  value?: ISelectOption;
  setValue: Dispatch<SetStateAction<ISelectOption>>;
}

export default function SelectBox({ options, value, setValue }: Props) {
  const [selectedValue, setSelectedValue] = useState<ISelectOption>(value || options[0]);
  const [showOptions, setShowOptions] = useState<boolean>(false);

  useEffect(() => {
    setValue(value || options[0]);
  }, [setValue]);

  return (
    <SelectBoxContainer onClick={() => setShowOptions((prev) => !prev)}>
      <Selected>{selectedValue.name}</Selected>
      {showOptions && (
        <SelectOptions>
          {options.map((option) => (
            <Option
              key={option.id}
              value={option.id}
              onClick={() => {
                setSelectedValue(option);
                setValue(option);
              }}
            >
              {option.name}
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
