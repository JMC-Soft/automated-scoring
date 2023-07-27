import React from 'react';
import clsx from 'clsx';

function TypeTag({ type }: { type: string }) {
  return (
    <div
      className={clsx(
        'flex h-fit items-center justify-center self-start rounded px-1 py-0.5 text-xs font-bold shadow xl:px-1.5 xl:py-1',
        {
          'bg-accent-500 text-white': type === '자기표현',
          'bg-primary-500 text-white': type === '설득',
          'bg-success-500 text-white': type === '정보전달',
        },
      )}
    >
      {type}
    </div>
  );
}

export default TypeTag;
