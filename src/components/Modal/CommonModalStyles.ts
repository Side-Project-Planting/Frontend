import styled from 'styled-components';

export const ModalInformation = styled.p`
  font-size: 1.2rem;
  text-align: center;
`;

export const ModalButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

export const ModalButton = styled.button`
  width: 8rem;
  height: 2.5rem;
  border-radius: 8px;
  background-color: rgba(100, 212, 171, 1);
  color: white;
  line-height: 10%;
`;

export const TaskModalWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const TaskFormContainer = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
`;

export const InputField = styled.div`
  display: flex;
  flex-direction: column;

  label {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    color: #76808e;
  }

  input {
    height: 2.5rem;
    padding: 1rem;
    background-color: #fafafa;
    border-radius: 8px;
    font-size: 0.9rem;

    &:focus {
      outline: 1px solid #b8b8b84f;
    }
  }
`;

export const Fields = styled.div`
  height: 4.5rem;
  display: flex;
  gap: 3rem;
`;

export const AssigneeField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .assignee-label {
    color: #76808e;
  }
`;
