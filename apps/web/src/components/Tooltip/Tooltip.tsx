import * as RadixTooltip from '@radix-ui/react-tooltip';
import clsx from 'clsx';
import React from 'react';

export interface TooltipProps {
  children: React.ReactNode;
  tooltip: React.ReactNode;
  tooltipConfig: RadixTooltip.TooltipContentProps;
}

function Tooltip({ children, tooltip, tooltipConfig: { className, ...rest } }: TooltipProps): JSX.Element {
  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            side="bottom"
            className={clsx(
              'select-none rounded bg-midnight px-4 py-2 text-base leading-none text-white',
              'shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]',
              'will-change-[transform,opacity] data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade',
              'data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade',
              'data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade',
              'data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade',
              'dark:bg-white dark:text-midnight',
              className
            )}
            sideOffset={5}
            {...rest}
          >
            {tooltip}
            <RadixTooltip.Arrow className="fill-midnight dark:fill-white" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}

export default Tooltip;
