'use client';

import {
  Children,
  cloneElement,
  ComponentProps,
  PropsWithChildren,
  ReactElement,
  useMemo,
  useState,
} from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { AccordionTitle } from '@/components/ui/Accordion/AccordionTitle';
import {
  AccordionPanel,
  AccordionPanelProps,
} from '@/components/ui/Accordion/AccordionPanel';
import { AccordionContent } from '@/components/ui/Accordion/AccordionContent';
import { HeroIconComponent } from '@/lib/typing';

export interface AccordionProps
  extends PropsWithChildren<ComponentProps<'div'>> {
  children:
    | ReactElement<AccordionPanelProps>
    | ReactElement<AccordionPanelProps>[];
  collapseAll?: boolean;
  className?: string;
  arrowIcon?: HeroIconComponent;
  alwaysOpen?: boolean;
}

function AccordionComponent({
  children,
  collapseAll = false,
  className,
  arrowIcon = ChevronDownIcon,
  alwaysOpen = false,
  ...props
}: AccordionProps) {
  const [isOpen, setOpen] = useState(collapseAll ? -1 : 0);

  const panels = useMemo(
    () =>
      Children.map(children, (child, i) =>
        cloneElement(child, {
          isOpen: i === isOpen,
          setOpen: () => setOpen(isOpen === i ? -1 : i),
          arrowIcon,
          alwaysOpen,
        }),
      ),
    [children, isOpen, arrowIcon, alwaysOpen],
  );

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div className={className} {...props}>
      {panels}
    </div>
  );
}

export const Accordion = Object.assign(AccordionComponent, {
  Panel: AccordionPanel,
  Title: AccordionTitle,
  Content: AccordionContent,
});
