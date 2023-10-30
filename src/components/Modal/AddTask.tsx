import React, { Dispatch, SetStateAction, useState } from 'react';

import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { ILabel, ISelectOption, ITask } from 'types';

import { ReactComponent as DeadlineDate } from '@assets/images/deadlineCheck.svg';
import { ReactComponent as StartDate } from '@assets/images/startDate.svg';
import LabelInput from '@components/LabelInput';
import { ModalButton } from '@components/Modal/CommonModalStyles';
import SelectBox from '@components/SelectBox';
import { membersState, modalState } from '@recoil/atoms';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const FormContainer = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
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
  gap: 0.5rem;

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
  addTaskHandler: Dispatch<SetStateAction<Record<number, ITask[]>>>;
  onClose: () => void;
}

export default function AddTaskModal({ addTaskHandler, onClose }: Props) {
  const today = new Date();

  const members = useRecoilValue(membersState);
  const [taskName, setTaskName] = useState<string>('');
  const [assignee, setAssignee] = useState<ISelectOption>({ id: -1, name: '' });
  const [checkDeadline, setCheckDeadline] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>(
    [today.getFullYear(), today.getMonth() + 1, today.getDate()].join('-'),
  );
  const [endDate, setEndDate] = useState<string>(startDate);
  const [selectedLabels, setSelectedLabels] = useState<ILabel[]>([]);
  const modalInfo = useRecoilValue(modalState);

  const options = members.map((member) => {
    return { id: member.id, name: member.name };
  });

  const changeStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value > endDate) {
      setEndDate(e.currentTarget.value);
    }
    setStartDate(e.currentTarget.value);
  };

  const changeEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value < startDate) {
      setStartDate(e.currentTarget.value);
    }
    setEndDate(e.currentTarget.value);
  };

  const submitAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTask: ITask = {
      // TODO: 백엔드로 할 일 추가 요청 후 id 받아와야 함
      id: Math.floor(Math.random() * 1000) + 5,
      title: taskName,
      tabId: modalInfo.tabId,
      labels: selectedLabels.map((label) => label.id),
      assignee: assignee.name,
      assigneeId: assignee.id,
      order: modalInfo.taskOrder,
      dateRange: checkDeadline ? [startDate, endDate] : null,
    };
    // Plan 페이지 tasks 상태에 반영
    addTaskHandler((prev) => {
      const newTasks = { ...prev };
      newTasks[modalInfo.tabId].push(newTask);
      return newTasks;
    });
    // 모달 닫기
    onClose();
  };

  return (
    <Wrapper>
      <FormContainer onSubmit={submitAddTask}>
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
              <>
                <div className="deadline-prop">
                  <div className="prop-name-container">
                    <StartDate width="1rem" height="1rem" />
                    <div className="prop-name">시작일</div>
                  </div>
                  <input type="date" value={startDate} onChange={changeStartDate} />
                </div>
                <div className="deadline-prop">
                  <div className="prop-name-container">
                    <DeadlineDate width="1rem" height="1rem" />
                    <div className="prop-name">종료일</div>
                  </div>
                  <input type="date" value={endDate} onChange={changeEndDate} />
                </div>
              </>
            )}
          </DeadlineField>
        </Fields>
        <InputField>
          <LabelInput alreadySelected={[]} selectedLabelsHandler={setSelectedLabels} />
        </InputField>
        <ModalButton type="submit">추가하기</ModalButton>
      </FormContainer>
    </Wrapper>
  );
}
