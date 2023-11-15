import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';
import { ILabel } from 'types';

import { LabelsWrapper, LabelsContainer, SearchedLabel } from './styles';

import { createLabel } from '@apis';
import LabelItem from '@components/LabelItem';
import { currentPlanIdState, labelsState } from '@recoil/atoms';

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
  const currentPlanId = useRecoilValue(currentPlanIdState);

  const findLabelByValue = (labelValue: string) => {
    return labelsClone.find((label) => label.value === labelValue);
  };

  const createNewLabel = async (labelValue: string) => {
    const newId = await createLabel(currentPlanId, labelValue);
    const newLabel: ILabel = { id: newId, value: labelValue };
    setLabels([...labelsClone, newLabel]);
    labelsClone = [...labelsClone, newLabel];
    setSearched(labelsClone);
    return newLabel;
  };

  const searchLabelName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedIdx(-1);
    if (e.currentTarget.value.length === 0) setSearched(labelsClone);
    else setSearched(labelsClone.filter((label) => label.value.includes(e.currentTarget.value)));
  };

  const isIncludeIn = (labelArr: ILabel[], currentLabelId: number) => {
    return !(labelArr.find((label) => label.id === currentLabelId) === undefined);
  };

  const checkDuplicatedLabel = (labelArr: ILabel[], currentLabelId: number) => {
    if (isIncludeIn(labelArr, currentLabelId)) {
      // eslint-disable-next-line
      alert('이미 등록된 레이블입니다!');
      setSearchedIdx(-1);
      return false;
    }
    return true;
  };

  const checkNoValue = (value: string) => {
    if (value.length === 0) {
      // eslint-disable-next-line
      alert('최소 1글자 이상 입력해주세요!');
      return false;
    }
    return true;
  };

  const selectLabel = (currentLabel: ILabel) => {
    if (currentLabel === undefined || checkDuplicatedLabel(selected, currentLabel.id) === false) {
      return;
    }

    setSelected([...selected, currentLabel]);
    selectedLabelsHandler([...selected, currentLabel]);
    labelInput.current!.value = '';
  };

  const onKeyDownInlabelInput = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing === true) return;
    if (searched.length > 0) {
      if (e.key === 'ArrowDown') {
        setSearchedIdx((prev) => (prev + 1 >= searched.length ? -1 : prev + 1));
      }
      if (e.key === 'ArrowUp') {
        setSearchedIdx((prev) => (prev - 1 < -1 ? searched.length - 1 : prev - 1));
      }
    }
    if (e.key === 'Escape') {
      setSearchedIdx(-1);
      setShowSearchLabel(false);
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      if (labelInput.current === null) return;
      if (searchedIdx < 0 && checkNoValue(labelInput.current.value) === false) return;
      if (searchedIdx >= 0 && labelInput.current.value.length === 0) {
        selectLabel(searched[searchedIdx]);
        return;
      }

      const inputValue = labelInput.current.value;
      if (searchedIdx < 0) {
        let currentLabel = findLabelByValue(inputValue);
        currentLabel = currentLabel || (await createNewLabel(inputValue));
        selectLabel(currentLabel);
      } else {
        selectLabel(searched[searchedIdx]);
      }
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
    selectedLabelsHandler(updateLabels);
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
