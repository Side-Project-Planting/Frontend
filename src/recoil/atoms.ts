import { atom } from 'recoil';
import { ILabel, IMember } from 'types';

export const membersState = atom<IMember[]>({
  key: 'members',
  default: [],
});

export const labelsState = atom<ILabel[]>({
  key: 'labels',
  default: [],
});
