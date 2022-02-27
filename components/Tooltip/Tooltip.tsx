import { useState } from 'react';

export interface TooltipProps {
  position: 'top' | 'bottom' | 'left' | 'right';
  text: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, position, text }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
      >
        {children}
      </div>
      {show && (
        <p className="absolute left-0 right-0 z-10 flex min-w-max justify-center rounded-md bg-neutral-800 bg-opacity-60 py-2 px-2 text-center text-xs text-white dark:bg-neutral-600 dark:bg-opacity-100">
          {text}
        </p>
      )}
    </div>
  );
};

export default Tooltip;
