import { PropsWithChildren, useState } from 'react';
import { AccordionProps } from '@/components/ui/Accordion/Accordion';
import { AccordionPanelContext } from './AccordionPanelContext';

export interface AccordionPanelProps extends PropsWithChildren<AccordionProps> {
  isOpen?: boolean;
  setOpen?: () => void;
}

export function AccordionPanel({ children, ...props }: AccordionPanelProps) {
  const { alwaysOpen } = props;

  const [isOpen, setOpen] = useState(props.isOpen);
  const provider = alwaysOpen
    ? // eslint-disable-next-line react/jsx-no-constructed-context-values
      {
        ...props,
        isOpen,
        setOpen: () => setOpen(!isOpen),
      }
    : props;
  return (
    <AccordionPanelContext.Provider value={provider}>
      {children}
    </AccordionPanelContext.Provider>
  );
}
