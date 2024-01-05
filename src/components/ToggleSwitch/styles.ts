import styled from 'styled-components';

export const ToggleSwitchContainer = styled.label`
  cursor: pointer;
  width: 50px;
  height: 26px;
  background: #b8b8b8;
  display: block;
  border-radius: 100px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    width: 18px;
    height: 18px;
    background-color: #ffffff;
    border-radius: 90px;
    transition: 0.2s ease-out;
  }

  .hidden {
    width: 1px;
    height: 1px;
    margin: -1px;
    position: absolute;
    clip: rect(0 0 0 0);
    overflow: hidden;
  }
`;

export const ToggleCheckbox = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;

  &:checked + label {
    background: #64d4ab;

    &::after {
      left: calc(100% - 3px);
      transform: translateX(-100%);
    }
  }
`;
