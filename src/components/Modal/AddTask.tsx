import React, { useState } from 'react';

import { useRecoilValue } from 'recoil';
import { IAddTaskModal, ILabel, ISelectOption } from 'types';

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

export default function AddTaskModal() {
  const members = useRecoilValue(membersState);
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [assignee, setAssignee] = useState<ISelectOption>({ id: -1, name: '' });
  const [dateRange, setDateRange] = useState<string[] | null>(null);
  const [selectedLabels, setSelectedLabels] = useState<ILabel[]>([]);
  const modalData = useRecoilValue(modalDataState) as IAddTaskModal;
  const currentPlanId = useRecoilValue(currentPlanIdState);
  const { closeModal } = useModal();
  const { createTaskMutate } = useUpdateTask(currentPlanId);

  const options = members.map((member) => {
    return { id: member.id, name: member.name };
  });

  const submitAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const startDate = dateRange ? dateRange[0] : null;
    const endDate = dateRange ? dateRange[1] : null;
    const requestBody = {
      planId: currentPlanId,
      tabId: modalData.tabId,
      assigneeId: assignee.id,
      title: taskTitle,
      description: '',
      startDate,
      endDate,
      labels: selectedLabels.map((label) => label.id),
    };

    createTaskMutate(requestBody);

    closeModal();
  };

  return (
    <TaskModalWrapper>
      <TaskFormContainer onSubmit={submitAddTask}>
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
            <SelectBox options={options} setValue={setAssignee} />
          </AssigneeField>
          <DateRange setDateRange={setDateRange} />
        </Fields>
        <InputField>
          <LabelInput alreadySelected={[]} selectedLabelsHandler={setSelectedLabels} />
        </InputField>
        <ModalButton type="submit">추가하기</ModalButton>
      </TaskFormContainer>
    </TaskModalWrapper>
  );
}
