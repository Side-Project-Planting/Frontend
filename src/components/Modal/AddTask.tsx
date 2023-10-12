import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import { ModalButton } from './CommonModalStyles';
import SelectBox from '../SelectBox';
import { ReactComponent as StartDate } from '../../assets/images/startDate.svg';
import { ReactComponent as DeadlineDate } from '../../assets/images/deadlineCheck.svg';
import { hashStringToColor } from '../../utils';

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

const LabelsWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  #tag-search {
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

  #no-coincide-tag {
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

  #tags {
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

const LabelItem = styled.li<{ color: string }>`
  list-style: none;
  position: relative;
  padding: 0.5rem 1rem;
  height: 80%;
  border-radius: 10px;
  color: white;
  text-align: center;
  line-height: 100%;
  background-color: ${(prop) => prop.color};

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

const SearchedTag = styled.button<{ $isFocus: boolean }>`
  padding: 0.5rem 1rem;
  border: 0;
  background-color: ${(prop) => (prop.$isFocus ? 'rgb(127, 127, 127, 0.3)' : 'transparent')};
  text-align: start;
`;

interface Props {
  members: string[][];
  allTags: string[];
}

export default function AddTaskModal({ members, allTags }: Props) {
  const today = new Date();

  const tagInput = useRef<HTMLInputElement>(null);
  const searchWindowRef = useRef<HTMLDivElement>(null);

  const [taskName, setTaskName] = useState<string>('');
  const [assignee, setAssignee] = useState<string>('');
  const [checkDeadline, setCheckDeadline] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>(
    [today.getFullYear(), today.getMonth() + 1, today.getDate()].join('-'),
  );
  const [endDate, setEndDate] = useState<string>(startDate);
  const [searchedTags, setSearchedTags] = useState<string[]>(allTags);
  const [tags, setTags] = useState<string[]>(['label1', 'label2']);
  // TODO: 새로 추가된 라벨들을 서버에 따로 보내줘야하지 않을까 해서 만든 상태
  // const [newTags, setNewTags] = useState<string[]>([]);
  const [showSearchTag, setShowSearchTag] = useState<boolean>(false);
  const [tagButtonIdx, setTagButtonIdx] = useState<number>(-1);

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

  const searchTagName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length === 0) setSearchedTags(allTags);
    else setSearchedTags(allTags.filter((tag) => tag.includes(e.currentTarget.value)));
  };

  const isIncludeInTagState = (currentTag: string) => {
    return tags.includes(currentTag);
  };

  const addTag = (currentTag: string) => {
    if (isIncludeInTagState(currentTag)) {
      alert('이미 등록된 레이블입니다!');
      return;
    }
    allTags.push(currentTag);
    setSearchedTags(allTags);
    setTags([...tags, currentTag]);
    tagInput.current!.value = '';
  };

  const onKeyDownInTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (searchedTags.length > 0) {
      if (e.key === 'ArrowDown') {
        setTagButtonIdx((prev) => (prev + 1 >= searchedTags.length ? 0 : prev + 1));
      }
      if (e.key === 'ArrowUp') {
        setTagButtonIdx((prev) => (prev - 1 < 0 ? searchedTags.length - 1 : prev - 1));
      }
    }
    if (e.key === 'Escape') {
      setTagButtonIdx(-1);
      setShowSearchTag(false);
    }
    if (e.key === 'Enter') {
      if (tagInput.current === null) return;
      if (tagInput.current.value.length === 0) {
        if (tagButtonIdx < 0) {
          alert('최소 1글자 이상 입력해주세요!');
          return;
        }
        addTag(searchedTags[tagButtonIdx]);
        return;
      }
      addTag(tagInput.current.value);
    }
  };

  const selectTag = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const currentTag = searchedTags[tagButtonIdx];
    if (isIncludeInTagState(currentTag)) alert('이미 등록된 레이블입니다!');
    else addTag(currentTag);
  };

  const onClickDeleteTag = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget.id.split('-')[1];
    const updateTags = tags.filter((tag) => tag !== target);
    setTags(updateTags);
  };

  const submitAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 백엔드로 할 일 추가 요청
    const requestData = {
      taskName,
      assignee,
      dateRange: checkDeadline ? [null, null] : [startDate, endDate],
      tags,
    };
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
                <ul id="tags">
                  {tags.map((tag) => (
                    <LabelItem key={tag} color={hashStringToColor(tag)}>
                      <span>{tag}</span>
                      <button id={`delete-${tag}`} type="button" onClick={onClickDeleteTag}>
                        <IoClose />
                      </button>
                    </LabelItem>
                  ))}
                  <input
                    id="task-label-input"
                    type="text"
                    autoComplete="off"
                    onKeyDown={onKeyDownInTagInput}
                    onFocus={() => setShowSearchTag(true)}
                    onBlur={() => setShowSearchTag(false)}
                    onChange={searchTagName}
                    ref={tagInput}
                  />
                </ul>
              </LabelsContainer>
              {showSearchTag && (
                <div id="tag-search" ref={searchWindowRef}>
                  {searchedTags.length === 0 ? (
                    <p id="no-coincide-tag">일치하는 레이블이 없습니다.</p>
                  ) : (
                    searchedTags.map((tag, idx) => (
                      <SearchedTag
                        key={tag}
                        type="button"
                        $isFocus={idx === tagButtonIdx}
                        onMouseDown={selectTag}
                        onMouseOver={() => setTagButtonIdx(idx)}
                        onMouseOut={() => setTagButtonIdx(-1)}
                      >
                        {tag}
                      </SearchedTag>
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
