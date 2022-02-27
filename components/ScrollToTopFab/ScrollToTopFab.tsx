import { Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/outline';
import { Fragment, useEffect, useState } from 'react';

export interface ScrollToTopFabProps {}

const ScrollToTopFab: React.FC<ScrollToTopFabProps> = ({}) => {
  const [show, setShow] = useState(false);

  const onClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const scrollListener = () => {
      setShow(window.scrollY > 0);
    };

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, []);

  if (!show) {
    return <></>;
  }

  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
      show={show}
    >
      <button className="fixed bottom-8 right-8 rounded-full bg-primary p-2" onClick={onClick}>
        <ChevronUpIcon className="h-4 w-4 text-white" />
      </button>
    </Transition>
  );
};

export default ScrollToTopFab;
