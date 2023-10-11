import React, { useState } from 'react';
import styled from 'styled-components';
import { ModalButton } from './CommonModalStyles';
import SelectBox from '../SelectBox';
import { ReactComponent as DeadlineCheck } from '../../assets/images/deadlineCheck.svg';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const FormContainer = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const InputField = styled.div`
  display: flex;
  flex-direction: column;

  label {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    color: #76808e;
  }

  input {
    padding: 1rem;
    background-color: #fafafa;
    border-radius: 8px;
    font-size: 0.9rem;

    &:focus {
      outline: 1px solid #b8b8b84f;
    }
  }
`;

const Fields = styled.div`
  display: flex;
  gap: 3rem;
`;

const AssigneeField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .assignee-label {
    color: #76808e;
  }
`;

const DeadlineField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  .deadline-label {
    display: flex;
    gap: 0.5rem;
    align-items: center;

    .label-name {
      color: #76808e;
    }
  }

  .deadline-prop {
    padding-left: 0.5rem;
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;

    .prop-name-container {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      justify-content: center;

      .prop-name {
        font-size: 0.8rem;
      }
    }
  }
`;

interface Props {
  members: string[][];
}

export default function AddTaskModal({ members }: Props) {
  const today = new Date();

  const [taskName, setTaskName] = useState<string>('');
  const [assignee, setAssignee] = useState<string>('');
  const [checkDeadline, setCheckDeadline] = useState<boolean>(false);
  const [deadline, setDeadline] = useState<string>(
    [today.getFullYear(), today.getMonth() + 1, today.getDate()].join('-'),
  );

  const options = members.map((member) => {
    return { value: member[1], label: member[0] };
  });

  console.log(assignee);

  return (
    <Wrapper>
      <FormContainer>
        <InputField>
          <label htmlFor="task-name">
            할 일
            <input
              type="text"
              id="task-name"
              name="task-name"
              value={taskName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTaskName(e.target.value)}
              placeholder="할 일이 무엇인지 적어주세요."
            />
          </label>
        </InputField>
        <Fields>
          <AssigneeField>
            <div className="assignee-label">담당자</div>
            <SelectBox options={options} setValue={setAssignee} />
          </AssigneeField>
          <DeadlineField>
            <div className="deadline-label">
              <input type="checkbox" checked={checkDeadline} onChange={() => setCheckDeadline((prev) => !prev)} />
              <div className="label-name">기간</div>
            </div>
            {checkDeadline && (
              <div className="deadline-prop">
                <div className="prop-name-container">
                  <DeadlineCheck width="1rem" height="1rem" />
                  <div className="prop-name">종료일</div>
                </div>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDeadline(e.target.value)}
                />
              </div>
            )}
          </DeadlineField>
        </Fields>

        <ModalButton type="button">추가하기</ModalButton>
      </FormContainer>
    </Wrapper>
  );
}
