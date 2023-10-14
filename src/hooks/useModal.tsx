import { useState } from 'react';

import Modal from '@components/Modal';

export default function useModal() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  return { Modal, showModal, openModal, closeModal };
}
