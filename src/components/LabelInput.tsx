import React, { Dispatch, SetStateAction, useRef, useState } from 'react';

import styled from 'styled-components';

import LabelItem from '@components/LabelItem';

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
  allLabels: string[];
  alreadySelected: string[];
  selectedLabelsHandler: Dispatch<SetStateAction<string[]>>;
}

export default function LabelInput({ allLabels, alreadySelected, selectedLabelsHandler }: Props) {
  const labelInput = useRef<HTMLInputElement>(null);
  const searchWindowRef = useRef<HTMLDivElement>(null);
  const [searched, setSearched] = useState<string[]>(allLabels);
  const [selected, setSelected] = useState<string[]>(alreadySelected);
  // TODO: 새로 추가된 라벨들을 서버에 따로 보내줘야하지 않을까 해서 만든 상태
  // const [newLabels, setNewLabels] = useState<string[]>([]);
  const [searchedIdx, setSearchedIdx] = useState<number>(-1);
  const [showSearchLabel, setShowSearchLabel] = useState<boolean>(false);

  const searchLabelName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length === 0) setSearched(allLabels);
    else setSearched(allLabels.filter((label) => label.includes(e.currentTarget.value)));
  };

  const isIncludeIn = (labelArr: string[], currentLabel: string) => {
    return labelArr.includes(currentLabel);
  };

  const addLabel = (currentLabel: string) => {
    if (isIncludeIn(selected, currentLabel)) {
      // eslint-disable-next-line
      alert('이미 등록된 레이블입니다!');
      return;
    }
    if (isIncludeIn(allLabels, currentLabel) === false) allLabels.push(currentLabel);

    setSearched(allLabels);
    setSelected([...selected, currentLabel]);
    selectedLabelsHandler([...selected, currentLabel]);
    labelInput.current!.value = '';
  };

  const onKeyDownInlabelInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (searched.length > 0) {
      if (e.key === 'ArrowDown') {
        setSearchedIdx((prev) => (prev + 1 >= searched.length ? 0 : prev + 1));
      }
      if (e.key === 'ArrowUp') {
        setSearchedIdx((prev) => (prev - 1 < 0 ? searched.length - 1 : prev - 1));
      }
    }
    if (e.key === 'Escape') {
      setSearchedIdx(-1);
      setShowSearchLabel(false);
    }
    if (e.key === 'Enter') {
      if (labelInput.current === null) return;
      if (labelInput.current.value.length === 0) {
        if (searchedIdx < 0) {
          // eslint-disable-next-line
          alert('최소 1글자 이상 입력해주세요!');
          return;
        }
        addLabel(searched[searchedIdx]);
        return;
      }
      addLabel(labelInput.current.value);
    }
  };

  const onClickSearchedLabel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const currentLabel = searched[searchedIdx];
    addLabel(currentLabel);
  };

  const onClickDeleteLabel = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget.id.split('-')[1];
    const updateLabels = selected.filter((label) => label !== target);
    setSelected(updateLabels);
  };

  return (
    <label htmlFor="task-label-input">
      레이블
      <LabelsWrapper>
        <LabelsContainer>
          <ul id="labels">
            {selected.map((label, idx) => (
              <LabelItem
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
            {searched.length === 0 ? (
              <p id="no-coincide-label">일치하는 레이블이 없습니다.</p>
            ) : (
              searched.map((label, idx) => (
                <SearchedLabel
                  key={label}
                  type="button"
                  $isFocus={idx === searchedIdx}
                  onMouseDown={onClickSearchedLabel}
                  onMouseOver={() => setSearchedIdx(idx)}
                  onMouseOut={() => setSearchedIdx(-1)}
                >
                  {label}
                </SearchedLabel>
              ))
            )}
          </div>
        )}
      </LabelsWrapper>
    </label>
  );
}
