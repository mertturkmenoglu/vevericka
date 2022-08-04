import { useMemo, useRef } from 'react';
import { useTheme } from 'next-themes';
import ReactTooltip from 'react-tooltip';
import clsx from 'clsx';

export interface TooltipProps {
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  effect?: 'solid' | 'float';
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, text, position = 'top', effect = 'solid', className }) => {
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const { theme: themeFromHook } = useTheme();
  const theme = useMemo(() => (themeFromHook === 'dark' ? 'dark' : 'light'), [themeFromHook]);
  const bgColor = useMemo(() => (theme === 'dark' ? '#404040' : '#1a1a1a'), [theme]);

  return (
    <div
      data-tip={text}
      ref={tooltipRef}
      className={clsx('flex items-center', className)}
    >
      {children}
      <ReactTooltip
        place={position}
        backgroundColor={bgColor}
        effect={effect}
        clickable={true}
      />
    </div>
  );
};

export default Tooltip;
