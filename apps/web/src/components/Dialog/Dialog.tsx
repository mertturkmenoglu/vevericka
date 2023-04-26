import { Dialog as HeadlessDialog } from '@headlessui/react';
import React, { Dispatch, SetStateAction } from 'react';

export interface DialogProps {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title?: string;
}

function Dialog({ children, isOpen, setIsOpen, title }: DialogProps): JSX.Element {
  return (
    <HeadlessDialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div
        className="fixed inset-0 bg-black/30"
        aria-hidden="true"
      />

      <div className="fixed inset-0 flex w-full items-center justify-center p-4">
        <HeadlessDialog.Panel className="mx-auto w-full max-w-lg rounded bg-white">
          {title && <HeadlessDialog.Title>{title}</HeadlessDialog.Title>}

          {children}
        </HeadlessDialog.Panel>
      </div>
    </HeadlessDialog>
  );
}

export default Dialog;
