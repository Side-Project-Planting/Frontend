import { selectorFamily } from 'recoil';
import { ILabel, IMember } from 'types';

import { labelsState, membersState } from '@recoil/atoms';

export const memberSelector = selectorFamily<IMember, number>({
  key: 'filteredMember',
  get:
    (memberId: number) =>
    ({ get }) =>
      get(membersState).find((member) => member.id === memberId)!,
});

export const filteredLabelsSelector = selectorFamily<ILabel[], number[]>({
  key: 'filteredLabels',
  get:
    (idList: number[]) =>
    ({ get }) => {
      const filteredLabels: ILabel[] = [];
      const labels = get(labelsState);
      let p = 0;

      labels.forEach((label) => {
        if (label.id === idList[p]) {
          filteredLabels.push(label);
          p += 1;
        }
      });
      return filteredLabels;
    },
});
