import { atom } from 'recoil';
import { IAddTaskModal, ILabel, IMember } from 'types';

export const membersState = atom<IMember[]>({
  key: 'members',
  default: [],
});

export const labelsState = atom<ILabel[]>({
  key: 'labels',
  default: [],
});

export const modalState = atom<IAddTaskModal>({
  key: 'modal',
  default: { tabId: 0, taskOrder: 0 },
});
