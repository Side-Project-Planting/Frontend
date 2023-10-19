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
      for (let i = 0; i < labels.length; i += 1) {
        if (labels[i].id === idList[p]) {
          filteredLabels.push(labels[i]);
          p += 1;
        }
      }
      return filteredLabels;
    },
});
