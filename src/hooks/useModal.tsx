import { useCallback } from 'react';

import { useRecoilState } from 'recoil';
import { TModalType } from 'types';

import { modalState } from '@recoil/atoms';

export default function useModal() {
  const [modalInfo, setModalInfo] = useRecoilState(modalState);

  const closeModal = useCallback(
    () =>
      setModalInfo({
        isOpen: false,
        type: 'none',
      }),
    [setModalInfo],
  );

  const openModal = useCallback(
    (modalType: TModalType) =>
      setModalInfo({
        isOpen: true,
        type: modalType,
      }),
    [setModalInfo],
  );

  return { modalInfo, closeModal, openModal };
}
