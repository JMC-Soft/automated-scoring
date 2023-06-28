/* eslint-disable react/jsx-props-no-spreading */

import type { ComponentProps, PropsWithChildren } from 'react';
import clsx from 'clsx';
import { useAccordionContext } from './AccordionPanelContext';

export interface AccordionContentProps
  extends PropsWithChildren<ComponentProps<'ul'>> {}

export function AccordionContent({
  children,
  className,
  ...props
}: AccordionContentProps) {
  const { isOpen } = useAccordionContext();

  return (
    <ul
      className={clsx(className, {
        'max-h-0': !isOpen,
        'max-h-96': isOpen,
      })}
      {...props}
    >
      {children}
    </ul>
  );
}
