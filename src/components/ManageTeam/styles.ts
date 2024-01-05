import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 17.5rem;
  background-color: #fafafa;
  padding: 0.5rem 0.3rem;
  border: 1px solid rgb(208, 215, 222);
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow-y: auto;

  color: #939393;
  font-size: 14px;
`;

export const List = styled.div`
  .subTitle {
    font-size: 13px;
    font-weight: 600;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
`;

export const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .invite {
    color: #737373;
    font-size: 13px;
  }

  .memberInfo {
    display: flex;
    flex-direction: column;

    .name {
      font-weight: 600;
      color: #000;
    }
  }

  .delete {
    display: flex;
    align-items: center;

    .pending {
      margin-right: 1rem;
      color: #cf2d7b;
      font-weight: 600;
    }
  }

  button {
    font-weight: 600;
    color: #939393;

    &.invite {
      height: fit-content;
      border: none;
    }

    &.exist {
      border-radius: 0.5rem;
      border: 1px solid #d1d1d1;
      padding-inline: 0.9rem;
      height: 2.2rem;
      transition:
        color,
        background-color,
        border 0.3s cubic-bezier(0.33, 1, 0.68, 1);

      &:hover {
        background-color: #ff5353;
        color: #fff;
        border: none;
      }
    }
  }
`;
