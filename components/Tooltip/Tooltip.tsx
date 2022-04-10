import { useMemo, useRef } from 'react';
import { useTheme } from 'next-themes';
import ReactTooltip from 'react-tooltip';

export interface TooltipProps {
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  effect?: 'solid' | 'float';
}

const Tooltip: React.FC<TooltipProps> = ({ children, text, position = 'bottom', effect = 'solid' }) => {
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const { theme: themeFromHook } = useTheme();
  const theme = useMemo(() => (themeFromHook === 'dark' ? 'dark' : 'light'), [themeFromHook]);
  const bgColor = useMemo(() => (theme === 'dark' ? '#404040' : '#1a1a1a'), [theme]);

  return (
    <div
      data-tip={text}
      ref={tooltipRef}
      onFocus={() => ReactTooltip.show(tooltipRef.current!)}
      onBlur={() => ReactTooltip.hide(tooltipRef.current!)}
    >
      {children}
      <ReactTooltip place={position} backgroundColor={bgColor} effect={effect} clickable={true} />
    </div>
  );
};

export default Tooltip;
