import { createContext, useContext } from 'react';
import type { AccordionPanelProps } from './AccordionPanel';

type AccordionPanelContextType = Omit<AccordionPanelProps, 'children'>;

export const AccordionPanelContext = createContext<
  AccordionPanelContextType | undefined
>(undefined);

export function useAccordionContext(): AccordionPanelContextType {
  const context = useContext(AccordionPanelContext);

  if (!context) {
    throw new Error(
      'useAccordionContext should be used within the AccordionPanelContext provider!',
    );
  }

  return context;
}
