import styled from 'styled-components';

export const ToggleSwitchContainer = styled.label`
  cursor: pointer;
  width: 64px;
  height: 30px;
  background: #b8b8b8;
  display: block;
  border-radius: 100px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    width: 20px;
    height: 20px;
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
      left: calc(100% - 5px);
      transform: translateX(-100%);
    }
  }
`;
