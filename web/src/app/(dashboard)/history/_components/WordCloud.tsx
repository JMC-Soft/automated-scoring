'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Word } from 'react-d3-cloud/lib/WordCloud';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import type { WordCloud as WordCloudType } from '@/lib/types';
import TOPICS from '@/lib/constants/topic';

const D3WordCloud = dynamic(() => import('react-d3-cloud'), { ssr: false });

function WordCloud({ data }: { data: WordCloudType }) {
  const [activeTypeId, setActiveTypeId] = useState<keyof WordCloudType>(1);
  const [wordCloudData, setWordCloudData] = useState<
    { text: string; value: number }[]
  >([]);

  const fontSize = useCallback((word: Word) => Math.log2(word.value) * 10, []);

  const onClick = useCallback(
    (id: keyof WordCloudType) => () => {
      if (!data) return;
      setActiveTypeId(id);
      setWordCloudData(data[id] ?? []);
    },
    [data],
  );

  useEffect(() => {
    if (!data) return;

    setTimeout(() => {
      setWordCloudData(data[1] ?? []);
    }, 1000);
  }, [data]);

  const TOPIC_MAP = {
    1: '나의 위인전',
    2: '본인의 성격',
    3: '감상문',
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
            {TOPIC_MAP[topic.id as keyof typeof TOPIC_MAP]}
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

export default React.memo(WordCloud);
