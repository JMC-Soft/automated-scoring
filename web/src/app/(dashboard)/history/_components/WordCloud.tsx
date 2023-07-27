'use client';

import React, { useCallback, useState } from 'react';
import { Word } from 'react-d3-cloud/lib/WordCloud';
import dynamic from 'next/dynamic';
import clsx from 'clsx';
import type { WordCloud as WordCloudType } from '@/lib/types';
import TOPICS from '@/lib/constants/topic';

const NoSSR = dynamic(() => import('react-d3-cloud'), { ssr: false });

function WordCloud({ data }: { data: WordCloudType }) {
  const [activeTypeId, setActiveTypeId] = useState<keyof WordCloudType>(1);
  const [wordCloudData, setWordCloudData] = useState(data[1]);

  const fontSize = useCallback((word: Word) => Math.log2(word.value) * 15, []);
  const onClick = (id: keyof WordCloudType) => () => {
    setActiveTypeId(id);
    setWordCloudData(data[id] ?? []);
  };

  return (
    <div className="relative">
      <ul className="absolute left-1/2 top-1 flex -translate-x-1/2 gap-x-0.5">
        {TOPICS.map((topic) => (
          <button
            type="button"
            key={topic.id}
            onClick={onClick(topic.id as keyof WordCloudType)}
            className={clsx(
              'border-collapse whitespace-nowrap rounded px-2 py-1 text-xs font-semibold',
              { 'bg-secondary-500 text-white': activeTypeId === topic.id },
              {
                'bg-gray-400 text-white hover:bg-secondary-200':
                  activeTypeId !== topic.id,
              },
            )}
          >
            {topic.type}
          </button>
        ))}
      </ul>
      <NoSSR
        data={wordCloudData}
        width={400}
        height={300}
        font="pretendard"
        fontWeight="bold"
        fontSize={fontSize}
      />
    </div>
  );
}

export default WordCloud;
