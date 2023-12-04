import { atom } from 'recoil';
import { ILabel, IMember, IModalInfo, IPlanTitle, TModalData } from 'types';

export const currentPlanIdState = atom<number>({
  key: 'planId',
  default: -1,
});

export const planTitlesState = atom<IPlanTitle[]>({
  key: 'planTitles',
  default: [],
});

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

export const accessTokenState = atom<string | null>({
  key: 'accessToken',
  default: null,
});
