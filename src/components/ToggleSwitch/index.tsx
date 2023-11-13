import React from 'react';

import { ToggleCheckbox, ToggleSwitchContainer } from './styles';

type ToggleSwitchProps = {
  isPublic: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function ToggleSwitch({ isPublic, onChange }: ToggleSwitchProps) {
  return (
    <>
      <ToggleCheckbox type="checkbox" id="switch" name="isPublic" checked={isPublic} onChange={onChange} />
      <ToggleSwitchContainer htmlFor="switch">
        <span className="hidden">toggle switch</span>
      </ToggleSwitchContainer>
    </>
  );
}

export default ToggleSwitch;
