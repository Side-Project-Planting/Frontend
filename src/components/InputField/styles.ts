import styled from 'styled-components';

export const Container = styled.div`
  label {
    font-weight: 600;
  }

  input {
    display: block;
    width: 75rem;
    height: 2.2rem;
    padding: 0.5rem 0.7rem;
    margin-top: 0.4rem;
    border: 1px solid rgb(208, 215, 222);
    border-radius: 6px;
    outline: none;
    background-color: #fafafa;
    font-size: 14px;

    &.email {
      width: 600px;
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
