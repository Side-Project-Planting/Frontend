import React, { ReactNode } from 'react';

import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
}

export default function ModalPortal({ children }: PortalProps) {
  return <>{createPortal(children, document.body)}</>;
}
