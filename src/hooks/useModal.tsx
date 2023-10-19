import { useState } from 'react';

import Modal from '@components/Modal';

type ModalType = 'none' | 'normal' | 'exitPlan' | 'addTask' | 'editTask';

export default function useModal() {
  const [showModal, setShowModal] = useState<ModalType>('none');
  const openModal = (modalType: ModalType) => setShowModal(modalType);
  const closeModal = () => setShowModal('none');
  return { Modal, showModal, openModal, closeModal };
}
