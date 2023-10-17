import React, { useRef, useState } from 'react';

import styled from 'styled-components';

import { ReactComponent as DeadlineDate } from '@assets/images/deadlineCheck.svg';
import { ReactComponent as StartDate } from '@assets/images/startDate.svg';
import Label from '@components/Label';
import { ModalButton } from '@components/Modal/CommonModalStyles';
import SelectBox from '@components/SelectBox';

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

const LabelsWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  #label-search {
    position: absolute;
    width: 100%;
    max-height: 10rem;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    border-top: 1px solid lightgray;
    border-radius: 0 0 8px 8px;
    background-color: #fafafa;
  }

  #no-coincide-label {
    padding: 1rem;
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

  #labels {
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

const SearchedLabel = styled.button<{ $isFocus: boolean }>`
  padding: 0.5rem 1rem;
  border: 0;
  background-color: ${(prop) => (prop.$isFocus ? 'rgb(127, 127, 127, 0.3)' : 'transparent')};
  text-align: start;
`;

interface Props {
  members: string[][];
  allLabels: string[];
}

export default function AddTaskModal({ members, allLabels }: Props) {
  const today = new Date();

  const labelInput = useRef<HTMLInputElement>(null);
  const searchWindowRef = useRef<HTMLDivElement>(null);

  const [taskName, setTaskName] = useState<string>('');
  const [assignee, setAssignee] = useState<string>('');
  const [checkDeadline, setCheckDeadline] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>(
    [today.getFullYear(), today.getMonth() + 1, today.getDate()].join('-'),
  );
  const [endDate, setEndDate] = useState<string>(startDate);
  const [searchedLabels, setSearchedLabels] = useState<string[]>(allLabels);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  // TODO: 새로 추가된 라벨들을 서버에 따로 보내줘야하지 않을까 해서 만든 상태
  // const [newLabels, setNewLabels] = useState<string[]>([]);
  const [showSearchLabel, setShowSearchLabel] = useState<boolean>(false);
  const [searchedLabelIdx, setSearchedLabelIdx] = useState<number>(-1);

  const options = members.map((member) => {
    return { value: member[1], label: member[0] };
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

  const searchLabelName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length === 0) setSearchedLabels(allLabels);
    else setSearchedLabels(allLabels.filter((label) => label.includes(e.currentTarget.value)));
  };

  const isIncludeIn = (labelArr: string[], currentLabel: string) => {
    return labelArr.includes(currentLabel);
  };

  const addLabel = (currentLabel: string) => {
    if (isIncludeIn(selectedLabels, currentLabel)) {
      // eslint-disable-next-line
      alert('이미 등록된 레이블입니다!');
      return;
    }
    if (isIncludeIn(allLabels, currentLabel) === false) allLabels.push(currentLabel);
    setSearchedLabels(allLabels);
    setSelectedLabels([...selectedLabels, currentLabel]);
    labelInput.current!.value = '';
  };

  const onKeyDownInlabelInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (searchedLabels.length > 0) {
      if (e.key === 'ArrowDown') {
        setSearchedLabelIdx((prev) => (prev + 1 >= searchedLabels.length ? 0 : prev + 1));
      }
      if (e.key === 'ArrowUp') {
        setSearchedLabelIdx((prev) => (prev - 1 < 0 ? searchedLabels.length - 1 : prev - 1));
      }
    }
    if (e.key === 'Escape') {
      setSearchedLabelIdx(-1);
      setShowSearchLabel(false);
    }
    if (e.key === 'Enter') {
      if (labelInput.current === null) return;
      if (labelInput.current.value.length === 0) {
        if (searchedLabelIdx < 0) {
          // eslint-disable-next-line
          alert('최소 1글자 이상 입력해주세요!');
          return;
        }
        addLabel(searchedLabels[searchedLabelIdx]);
        return;
      }
      addLabel(labelInput.current.value);
    }
  };

  const onClickSearchedLabel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const currentLabel = searchedLabels[searchedLabelIdx];
    addLabel(currentLabel);
  };

  const onClickDeleteLabel = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget.id.split('-')[1];
    const updateLabels = selectedLabels.filter((label) => label !== target);
    setSelectedLabels(updateLabels);
  };

  const submitAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 백엔드로 할 일 추가 요청
    const requestData = {
      taskName,
      assignee,
      dateRange: checkDeadline ? [null, null] : [startDate, endDate],
      selectedLabels,
    };
    // eslint-disable-next-line
    console.log(requestData);
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
          <label htmlFor="task-label-input">
            레이블
            <LabelsWrapper>
              <LabelsContainer>
                <ul id="labels">
                  {selectedLabels.map((label, idx) => (
                    <Label
                      key={label}
                      height={2}
                      labelInfo={{ id: idx, value: label }}
                      deleteHandler={onClickDeleteLabel}
                    />
                  ))}
                  <input
                    id="task-label-input"
                    type="text"
                    autoComplete="off"
                    onKeyDown={onKeyDownInlabelInput}
                    onFocus={() => setShowSearchLabel(true)}
                    onBlur={() => setShowSearchLabel(false)}
                    onChange={searchLabelName}
                    ref={labelInput}
                  />
                </ul>
              </LabelsContainer>
              {showSearchLabel && (
                <div id="label-search" ref={searchWindowRef}>
                  {searchedLabels.length === 0 ? (
                    <p id="no-coincide-label">일치하는 레이블이 없습니다.</p>
                  ) : (
                    searchedLabels.map((label, idx) => (
                      <SearchedLabel
                        key={label}
                        type="button"
                        $isFocus={idx === searchedLabelIdx}
                        onMouseDown={onClickSearchedLabel}
                        onMouseOver={() => setSearchedLabelIdx(idx)}
                        onMouseOut={() => setSearchedLabelIdx(-1)}
                      >
                        {label}
                      </SearchedLabel>
                    ))
                  )}
                </div>
              )}
            </LabelsWrapper>
          </label>
        </InputField>
        <ModalButton type="submit">추가하기</ModalButton>
      </FormContainer>
    </Wrapper>
  );
}
