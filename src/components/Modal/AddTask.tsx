import React, { useState } from 'react';

import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { IAddTaskModal, ILabel, ISelectOption, ITask } from 'types';

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
import { currentPlanIdState, membersState, modalDataState } from '@recoil/atoms';

export default function AddTaskModal() {
  const members = useRecoilValue(membersState);
  const [taskName, setTaskName] = useState<string>('');
  const [assignee, setAssignee] = useState<ISelectOption>({ id: -1, name: '' });
  const [dateRange, setDateRange] = useState<string[] | null>(null);
  const [selectedLabels, setSelectedLabels] = useState<ILabel[]>([]);
  const modalData = useRecoilValue(modalDataState) as IAddTaskModal;
  const currentPlanId = useRecoilValue(currentPlanIdState);
  const { closeModal } = useModal();

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
      managerId: assignee.id,
      name: taskName,
      description: '',
      startDate,
      endDate,
      labels: selectedLabels.map((label) => label.id),
    };

    // TODO: 할일 추가 요청
    try {
      const response = await axios.post('/api/tasks', requestBody);
      // eslint-disable-next-line
      console.log(response);
    } catch (error) {
      // eslint-disable-next-line
      alert('할 일을 추가하지 못했어요 :(');
    }

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
      description: '',
    };
    // Plan 페이지 tasks 상태에 반영
    modalData.addTaskHandler((prev) => {
      const newTasks = { ...prev };
      const currentTabId = modalData.tabId;
      if (!newTasks[currentTabId]) newTasks[currentTabId] = [];
      newTasks[modalData.tabId].push(newTask);
      return newTasks;
    });
    // 모달 닫기
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
      </TaskFormContainer>
    </TaskModalWrapper>
  );
}
