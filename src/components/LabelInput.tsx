import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';

import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { ILabel } from 'types';

import LabelItem from '@components/LabelItem';
import { labelsState } from '@recoil/atoms';

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

const SearchedLabel = styled.button.attrs<{ id: number; $isFocus: boolean }>((props) => ({
  id: props.id,
}))`
  padding: 0.5rem 1rem;
  border: 0;
  background-color: ${(prop) => (prop.$isFocus ? 'rgb(127, 127, 127, 0.3)' : 'transparent')};
  text-align: start;
`;

interface Props {
  alreadySelected: ILabel[];
  selectedLabelsHandler: Dispatch<SetStateAction<ILabel[]>>;
}

export default function LabelInput({ alreadySelected, selectedLabelsHandler }: Props) {
  const [labels, setLabels] = useRecoilState(labelsState);
  let labelsClone = labels;
  const labelInput = useRef<HTMLInputElement>(null);
  const searchWindowRef = useRef<HTMLDivElement>(null);
  const currentSearchedRef = useRef<HTMLButtonElement>(null);
  const [searched, setSearched] = useState<ILabel[]>(labelsClone);
  const [selected, setSelected] = useState<ILabel[]>(alreadySelected);
  const [searchedIdx, setSearchedIdx] = useState<number>(-1);
  const [showSearchLabel, setShowSearchLabel] = useState<boolean>(false);

  /* TODO: Test용 함수이므로 API 연결시 제거 필요 */
  const getTempId = () => {
    let count = 5;
    return () => {
      count += 1;
      return count;
    };
  };
  const getNewLabelId = useCallback(getTempId(), []);
  /** ********************************************* */

  const findLabel = (labelId: number) => {
    return labelsClone.find((label) => label.id === labelId);
  };

  const createNewLabel = (labelValue: string) => {
    // TODO: 새로운 라벨 생성 요청
    const newId = getNewLabelId();
    const newLabel: ILabel = { id: newId, value: labelValue };
    setLabels([...labelsClone, newLabel]);
    labelsClone = [...labelsClone, newLabel];
    setSearched(labelsClone);
    return newLabel;
  };

  const searchLabelName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length === 0) setSearched(labelsClone);
    else setSearched(labelsClone.filter((label) => label.value.includes(e.currentTarget.value)));
  };

  const isIncludeIn = (labelArr: ILabel[], currentLabelId: number) => {
    return !(labelArr.find((label) => label.id === currentLabelId) === undefined);
  };

  const selectLabel = (currentLabel: ILabel) => {
    if (isIncludeIn(selected, currentLabel.id)) {
      // eslint-disable-next-line
      alert('이미 등록된 레이블입니다!');
      return;
    }

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
      e.preventDefault();
      if (labelInput.current === null) return;
      if (labelInput.current.value.length === 0) {
        if (searchedIdx < 0) {
          // eslint-disable-next-line
          alert('최소 1글자 이상 입력해주세요!');
          return;
        }
        selectLabel(searched[searchedIdx]);
        return;
      }
      let currentLabel = findLabel(+labelInput.current.id);
      currentLabel = currentLabel || createNewLabel(labelInput.current.value);
      selectLabel(currentLabel);
    }
  };

  const onClickSearchedLabel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const currentLabel = searched[searchedIdx];
    selectLabel(currentLabel);
  };

  const onClickDeleteLabel = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget.id.split('-')[1];
    const updateLabels = selected.filter((label) => label.value !== target);
    setSelected(updateLabels);
  };

  useEffect(() => {
    const moveToSearched = () => {
      currentSearchedRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    };
    moveToSearched();
  }, [searchedIdx]);

  return (
    <label htmlFor="task-label-input">
      레이블
      <LabelsWrapper>
        <LabelsContainer>
          <ul id="labels">
            {selected.map((label) => (
              <LabelItem key={label.id} height={2} labelInfo={label} deleteHandler={onClickDeleteLabel} />
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
            {
              /* eslint-disable-next-line */
              labelInput.current?.value.length === 0 ? (
                labelsClone.map((label, idx) => (
                  <SearchedLabel
                    key={label.id}
                    id={label.id}
                    type="button"
                    $isFocus={idx === searchedIdx}
                    ref={idx === searchedIdx ? currentSearchedRef : null}
                    onMouseDown={onClickSearchedLabel}
                    onMouseOver={() => setSearchedIdx(idx)}
                    onMouseOut={() => setSearchedIdx(-1)}
                  >
                    {label.value}
                  </SearchedLabel>
                ))
              ) : searched.length === 0 ? (
                <p id="no-coincide-label">일치하는 레이블이 없습니다.</p>
              ) : (
                searched.map((label, idx) => (
                  <SearchedLabel
                    key={label.id}
                    id={label.id}
                    type="button"
                    $isFocus={idx === searchedIdx}
                    ref={idx === searchedIdx ? currentSearchedRef : null}
                    onMouseDown={onClickSearchedLabel}
                    onMouseOver={() => setSearchedIdx(idx)}
                    onMouseOut={() => setSearchedIdx(-1)}
                  >
                    {label.value}
                  </SearchedLabel>
                ))
              )
            }
          </div>
        )}
      </LabelsWrapper>
    </label>
  );
}
