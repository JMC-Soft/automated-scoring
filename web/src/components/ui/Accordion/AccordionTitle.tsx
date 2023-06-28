/* eslint-disable react/jsx-props-no-spreading */

import type { ComponentProps } from 'react';
import clsx from 'clsx';
import { useAccordionContext } from './AccordionPanelContext';
import { HeroIconComponent } from '@/lib/typing';

export interface AccordionTitleProps extends ComponentProps<'button'> {
  arrowIcon?: HeroIconComponent;
}

export function AccordionTitle({
  children,
  className,
  ...props
}: AccordionTitleProps) {
  const { arrowIcon: ArrowIcon, isOpen, setOpen } = useAccordionContext();
  const onClick = () => typeof setOpen !== 'undefined' && setOpen();

  return (
    <button className={className} onClick={onClick} type="button" {...props}>
      <h2 className="text-xl font-bold">{children}</h2>
      {ArrowIcon && (
        <ArrowIcon
          className={clsx('h-5 w-5 stroke-2 transition-all duration-200', {
            'rotate-180': isOpen,
          })}
        />
      )}
    </button>
  );
}
