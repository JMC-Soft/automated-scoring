'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Word } from 'react-d3-cloud/lib/WordCloud';
import clsx from 'clsx';
import D3WordCloud from 'react-d3-cloud';
import type { WordCloud as WordCloudType } from '@/lib/types';
import TOPICS from '@/lib/constants/topic';

function WordCloud({ data }: { data: WordCloudType }) {
  const [activeTypeId, setActiveTypeId] = useState<keyof WordCloudType>(1);
  const [wordCloudData, setWordCloudData] = useState<
    { text: string; value: number }[]
  >([]);

  const fontSize = useCallback((word: Word) => Math.log2(word.value) * 15, []);
  const onClick = (id: keyof WordCloudType) => () => {
    setActiveTypeId(id);
  };

  useEffect(() => {
    if (!data) return;
    setWordCloudData(data[activeTypeId] ?? []);
  }, [data, activeTypeId]);

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
      <D3WordCloud
        data={wordCloudData}
        width={500}
        height={300}
        font="pretendard"
        fontWeight="bold"
        fontSize={fontSize}
      />
    </div>
  );
}

export default WordCloud;
