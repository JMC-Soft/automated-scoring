'use client';

import React, { useState } from 'react';
import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Button from '@/components/ui/Button';
import { Accordion } from '@/components/ui/Accordion';
import useEssayStore from '@/store/subjectStore';
import { SUBJECTS } from '@/lib/constants/constants';

export default function TopicBar() {
  const [isOpen, setIsOpen] = useState(true);
  const setTopic = useEssayStore((state) => state.setTopic);

  const handleTopicClick = (topic: string) => () => {
    setTopic(topic);
  };

  return (
    <aside
      className={clsx(
        'flex h-full flex-col gap-y-4 overflow-hidden pt-24 transition-all duration-500',
        {
          'w-[30vw] border-r px-12': isOpen,
          'w-0': !isOpen,
        },
      )}
    >
      <Button
        className="absolute top-6 ml-6 gap-x-3 rounded-lg px-4"
        onClick={() => setIsOpen(!isOpen)}
        Icon={ChevronDoubleRightIcon}
        iconClassName={clsx({ 'rotate-y-180': isOpen })}
      >
        문항 선택
      </Button>

      <Accordion
        collapseAll
        className="flex w-full flex-col gap-y-4 whitespace-nowrap"
      >
        {SUBJECTS.map((subject) => (
          <Accordion.Panel key={subject.name}>
            <Accordion.Title className="flex justify-between">
              {subject.name}
            </Accordion.Title>
            <Accordion.Content className="flex flex-col overflow-hidden transition-all duration-500">
              {subject.topics.map((topic) => (
                <button
                  type="button"
                  key={`${subject.name}-${topic}`}
                  onClick={handleTopicClick(topic)}
                  className="flex w-full border-t py-3 text-start text-base font-light transition-all hover:bg-gray-100"
                >
                  {topic}
                </button>
              ))}
            </Accordion.Content>
          </Accordion.Panel>
        ))}
      </Accordion>
    </aside>
  );
}
