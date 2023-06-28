'use client';

import React, { useState } from 'react';
import {
  ChevronDoubleRightIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Button from '@/components/ui/Button';
import { Accordion } from '@/components/ui/Accordion';

const SUBJECTS = [
  {
    name: '초등학교',
    topics: ['주제1', '주제2', '주제3', '주제4', '주제5'],
  },
  {
    name: '중학교',
    topics: ['주제1', '주제2', '주제3', '주제4', '주제5'],
  },
  {
    name: '고등학교',
    topics: ['주제1', '주제2', '주제3', '주제4', '주제5'],
  },
];

export default function TopicBar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={clsx(
        'flex h-full flex-col gap-y-4 whitespace-nowrap pt-24 transition-all duration-500',
        {
          'w-1/6 border-r  px-12': isOpen,
          'w-0 overflow-hidden': !isOpen,
        },
      )}
    >
      <Button
        className={clsx('absolute top-6 ml-6 gap-x-3', {})}
        onClick={() => setIsOpen(!isOpen)}
      >
        문항 선택
        <ChevronDoubleRightIcon
          className={clsx(
            'h-6 stroke-2 text-secondary-600 transition-all duration-500',
            {
              'rotate-y-180': isOpen,
            },
          )}
        />
      </Button>

      <Accordion collapseAll className="flex flex-col gap-y-1">
        {SUBJECTS.map((subject) => (
          <Accordion.Panel>
            <Accordion.Title>{subject.name}</Accordion.Title>
            <Accordion.Content className="flex flex-col gap-y-1">
              {subject.topics.map((topic) => (
                <li key={`${subject.name}-${topic}`} className="text-lg">
                  {topic}
                </li>
              ))}
            </Accordion.Content>
          </Accordion.Panel>
        ))}
      </Accordion>
    </aside>
  );
}
