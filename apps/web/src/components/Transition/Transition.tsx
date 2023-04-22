import { Transition as HeadlessTransition } from '@headlessui/react';
import React, { Fragment } from 'react';

export interface TransitionProps {
  children: React.ReactNode;
}

function Transition({ children }: TransitionProps): JSX.Element {
  return (
    <HeadlessTransition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      {children}
    </HeadlessTransition>
  );
}

export default Transition;
