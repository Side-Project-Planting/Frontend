import styled from 'styled-components';

export const Container = styled.div`
  label {
    color: #737373;
    font-size: 14px;
    font-weight: 600;
  }

  input {
    display: block;
    width: 100%;
    height: 2rem;
    padding: 0.3rem 0.5rem;
    margin-top: 0.4rem;
    border: 1px solid rgb(208, 215, 222);
    border-radius: 6px;
    outline: none;
    background-color: #fafafa;
    font-size: 12px;

    &.email {
      width: 100%;
      margin-top: 0;
    }

    &::placeholder {
      font-size: inherit;
    }

    &:focus {
      border: 2px solid #64d4ab;
    }
  }
`;
