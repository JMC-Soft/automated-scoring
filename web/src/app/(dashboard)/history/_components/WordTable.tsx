'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import { WordCloud as WordCloudType } from '@/lib/types';
import TOPICS from '@/lib/constants/topic';

type Props = { data: WordCloudType; className?: string };

function WordTable({ className, data }: Props) {
  const sortData = (wordList: { text: string; value: number }[]) => {
    return wordList.sort((a, b) => b.value - a.value);
  };

  const [activeTypeId, setActiveTypeId] = useState<keyof WordCloudType>(1);
  const [wordCloudData, setWordCloudData] = useState(sortData(data[1]));

  const onClick = (id: keyof WordCloudType) => () => {
    setActiveTypeId(id);
    setWordCloudData(sortData(data[id] ?? []));
  };

  return (
    <div
      className={clsx(
        'relative flex h-full flex-col gap-y-4 overflow-y-scroll bg-white px-4 py-4 text-center',
        className,
      )}
    >
      <ul className="absolute left-1 top-1 flex gap-x-0.5">
        {TOPICS.map((topic) => (
          <button
            type="button"
            key={topic.id}
            onClick={onClick(topic.id as keyof WordCloudType)}
            className={clsx(
              'border-collapse rounded  px-2 py-1 text-xs font-semibold',
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
      <h2 className="text-xl font-semibold">단어 사용 빈도</h2>
      <table className="w-full flex-1 text-center">
        <thead>
          <tr className="bg-secondary-200 text-white">
            <td className="h-8 px-1">순위</td>
            <td className="h-8 border-l border-white px-1">용어</td>
            <td className="border-l border-white px-1">빈도수</td>
            <td className="border-l border-white px-1">품사</td>
          </tr>
        </thead>
        <tbody className="w-full">
          {wordCloudData.map((v, i) => (
            <tr key={v.text} className="border-b">
              <td className="w-2/12 border-r">{i + 1}</td>
              <td className="w-4/12 border-r">{v.text}</td>
              <td className="w-2/12 border-r">{v.value}</td>
              <td className="w-3/12">명사</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WordTable;
