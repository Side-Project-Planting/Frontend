import { atom } from 'recoil';
import { ILabel, IMember, IModalInfo, TModalData } from 'types';

export const membersState = atom<IMember[]>({
  key: 'members',
  default: [],
});

export const labelsState = atom<ILabel[]>({
  key: 'labels',
  default: [],
});

export const modalState = atom<IModalInfo>({
  key: 'modal',
  default: { isOpen: false, type: 'none' },
});

export const modalDataState = atom<TModalData>({
  key: 'modalData',
  default: null,
});
