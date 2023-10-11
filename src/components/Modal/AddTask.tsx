import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
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

const Fields = styled.div`
  height: 4.5rem;
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

const LabelsContainer = styled.div`
  height: 5rem;
  padding: 0.3rem 1rem;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  align-items: center;
  gap: 0.5rem;
  background-color: #fafafa;
  border-radius: 8px;
  font-size: 0.9rem;

  ul {
    padding: 1rem 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    overflow: auto;
    gap: 0.5rem;
  }

  #task-label-input {
    width: 5rem;
    height: 2rem;
  }
`;

const LabelItem = styled.li`
  position: relative;
  padding: 0.5rem 1rem;
  height: 2rem;
  border-radius: 10px;
  color: black;
  text-align: center;
  line-height: 100%;
  background-color: skyblue;

  button {
    display: none;
    width: 1rem;
    height: 1rem;
    position: absolute;
    bottom: 1rem;
    right: -0.3rem;
    color: #f44336;
    background-color: white;
    border: 1px solid lightgray;
    border-radius: 50%;
    line-height: 110%;
  }

  &:hover button {
    display: flex;
  }
`;

interface Props {
  members: string[][];
}

export default function AddTaskModal({ members }: Props) {
  const today = new Date();

  const tagInput = useRef<HTMLInputElement>(null);
  const [taskName, setTaskName] = useState<string>('');
  const [assignee, setAssignee] = useState<string>('');
  const [checkDeadline, setCheckDeadline] = useState<boolean>(false);
  const [deadline, setDeadline] = useState<string>(
    [today.getFullYear(), today.getMonth() + 1, today.getDate()].join('-'),
  );
  const [tags, setTags] = useState<string[]>(['label1', 'label2']);

  const options = members.map((member) => {
    return { value: member[1], label: member[0] };
  });

  console.log(assignee);

  const enterTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (tagInput.current === null) return;
    if (e.key === 'Enter') {
      // TODO: alert decoration
      if (tagInput.current.value.length === 0) {
        alert('최소 1글자 이상 입력해주세요!');
        return;
      }
      if (tags.includes(tagInput.current.value)) {
        alert('이미 등록된 라벨입니다!');
        return;
      }
      setTags([...tags, tagInput.current.value]);
      tagInput.current.value = '';
    }
  };

  const onClickDeleteTag = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget.id.split('-')[1];
    const updateTags = tags.filter((tag) => tag !== target);
    setTags(updateTags);
  };

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
        <InputField>
          <label htmlFor="task-label-input">
            레이블
            <LabelsContainer>
              <ul id="tags">
                {tags.map((tag) => (
                  <LabelItem key={tag}>
                    <span>{tag}</span>
                    <button id={`delete-${tag}`} type="button" onClick={onClickDeleteTag}>
                      <IoClose />
                    </button>
                  </LabelItem>
                ))}
                <input id="task-label-input" type="text" onKeyUp={enterTag} ref={tagInput} />
              </ul>
            </LabelsContainer>
          </label>
        </InputField>
        <ModalButton type="button">추가하기</ModalButton>
      </FormContainer>
    </Wrapper>
  );
}
