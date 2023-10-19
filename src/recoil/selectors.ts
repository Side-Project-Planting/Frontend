import { selectorFamily } from 'recoil';
import { ILabel } from 'types';

import { labelsState } from '@recoil/atoms';

export const filteredLabelsSelector = selectorFamily<ILabel[], number[]>({
  key: 'filteredLabels',
  get:
    (idList: number[]) =>
    ({ get }) =>
      get(labelsState).filter((label, idx) => label.id === idList[idx]),
});
