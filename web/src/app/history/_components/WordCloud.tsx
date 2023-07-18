import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import WordCloudImage from '$/word_cloud.png';

function WordCloud({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        'flex flex-col items-center gap-y-2 bg-white p-4',
        className,
      )}
    >
      <h2 className="text-xl font-semibold">워드 클라우드</h2>
      <div className="relative w-full flex-1">
        <Image
          src={WordCloudImage}
          alt="워드 클라우드"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
    </div>
  );
}

export default WordCloud;
