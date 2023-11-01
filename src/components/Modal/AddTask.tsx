import React, { useState } from 'react';

import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { IAddTaskModal, ILabel, ISelectOption, ITask } from 'types';

import DateRange from '@components/DateRange';
import LabelInput from '@components/LabelInput';
import { ModalButton } from '@components/Modal/CommonModalStyles';
import SelectBox from '@components/SelectBox';
import useModal from '@hooks/useModal';
import { membersState, modalDataState } from '@recoil/atoms';

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

export default function AddTaskModal() {
  const members = useRecoilValue(membersState);
  const [taskName, setTaskName] = useState<string>('');
  const [assignee, setAssignee] = useState<ISelectOption>({ id: -1, name: '' });
  const [dateRange, setDateRange] = useState<string[] | null>(null);
  const [selectedLabels, setSelectedLabels] = useState<ILabel[]>([]);
  const modalData = useRecoilValue(modalDataState) as IAddTaskModal;
  const { closeModal } = useModal();

  const options = members.map((member) => {
    return { id: member.id, name: member.name };
  });

  const submitAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTask: ITask = {
      // TODO: 백엔드로 할 일 추가 요청 후 id 받아와야 함
      id: Math.floor(Math.random() * 1000) + 5,
      title: taskName,
      tabId: modalData.tabId,
      labels: selectedLabels.map((label) => label.id),
      assignee: assignee.name,
      assigneeId: assignee.id,
      order: modalData.taskOrder,
      dateRange: dateRange || null,
    };
    // Plan 페이지 tasks 상태에 반영
    modalData.addTaskHandler((prev) => {
      const newTasks = { ...prev };
      newTasks[modalData.tabId].push(newTask);
      return newTasks;
    });
    // 모달 닫기
    closeModal();
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
          <DateRange setDateRange={setDateRange} />
        </Fields>
        <InputField>
          <LabelInput alreadySelected={[]} selectedLabelsHandler={setSelectedLabels} />
        </InputField>
        <ModalButton type="submit">추가하기</ModalButton>
      </FormContainer>
    </Wrapper>
  );
}
