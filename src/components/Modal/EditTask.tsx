import React, { useState } from 'react';

import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { IEditTaskModal, ILabel, ISelectOption } from 'types';

import DateRange from '@components/DateRange';
import LabelInput from '@components/LabelInput';
import {
  AssigneeField,
  Fields,
  InputField,
  ModalButton,
  TaskFormContainer,
  TaskModalWrapper,
} from '@components/Modal/CommonModalStyles';
import SelectBox from '@components/SelectBox';
import useModal from '@hooks/useModal';
import { useUpdateTask } from '@hooks/useUpdateTask';
import { currentPlanIdState, membersState, modalDataState } from '@recoil/atoms';
import { filteredLabelsSelector, memberSelector } from '@recoil/selectors';

const DescriptionField = styled.div`
  display: flex;
  flex-direction: column;

  label {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    color: #76808e;
  }

  textarea {
    height: 15rem;
    padding: 1rem;
    background-color: #fafafa;
    border-radius: 8px;
    font-size: 0.9rem;
    resize: none;
    overflow-y: scroll;

    &:focus {
      outline: 1px solid #b8b8b84f;
    }
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;

function EditTaskModal() {
  const { task } = useRecoilValue(modalDataState) as IEditTaskModal;
  const filteredLabels = useRecoilValue(filteredLabelsSelector(task.labels));
  const members = useRecoilValue(membersState);
  const filteredMember = task.assigneeId ? useRecoilValue(memberSelector(task.assigneeId)) : null;
  const currentPlanId = useRecoilValue(currentPlanIdState);
  const { updateTaskMutate } = useUpdateTask(currentPlanId);

  const [taskTitle, setTaskTitle] = useState<string>(task.title);
  const [assignee, setAssignee] = useState<ISelectOption>(
    filteredMember ? { id: task.assigneeId, name: filteredMember.name } : { id: -1, name: '' },
  );
  const [dateRange, setDateRange] = useState<string[] | null>(null);
  const [selectedLabels, setSelectedLabels] = useState<ILabel[]>(filteredLabels);
  const [taskDescription, setTaskDescription] = useState<string>(task.description);
  const { closeModal } = useModal();

  const options = members.map((member) => {
    return { id: member.id, name: member.name };
  });

  const submitEditTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const startDate = dateRange ? dateRange[0] : null;
    const endDate = dateRange ? dateRange[1] : null;
    const requestBody = {
      taskId: task.id,
      planId: currentPlanId,
      tabId: task.tabId,
      assigneeId: assignee.id!,
      title: taskTitle,
      description: taskDescription,
      startDate,
      endDate,
      labels: selectedLabels.map((label) => label.id),
    };
    updateTaskMutate(requestBody);

    closeModal();
  };

  return (
    <TaskModalWrapper>
      <TaskFormContainer onSubmit={submitEditTask}>
        <InputField>
          <label htmlFor="task-name">
            할 일
            <input
              type="text"
              id="task-name"
              name="task-name"
              value={taskTitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTaskTitle(e.target.value)}
              placeholder="할 일이 무엇인지 적어주세요."
            />
          </label>
        </InputField>
        <Fields>
          <AssigneeField>
            <div className="assignee-label">담당자</div>
            <SelectBox options={options} value={assignee} setValue={setAssignee} />
          </AssigneeField>
          <DateRange setDateRange={setDateRange} />
        </Fields>
        <InputField>
          <LabelInput alreadySelected={selectedLabels} selectedLabelsHandler={setSelectedLabels} />
        </InputField>
        <DescriptionField>
          <label htmlFor="task-description">
            설명
            <textarea
              id="task-description"
              name="task-description"
              value={taskDescription}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTaskDescription(e.target.value)}
              placeholder="할 일에 대해 자유롭게 기록해주세요."
            />
          </label>
        </DescriptionField>
        <ButtonContainer>
          <ModalButton type="submit">저장하기</ModalButton>
        </ButtonContainer>
      </TaskFormContainer>
    </TaskModalWrapper>
  );
}

export default EditTaskModal;
