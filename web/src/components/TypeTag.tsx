import React from 'react';
import clsx from 'clsx';

function TypeTag({ title }: { title: string }) {
  return (
    <div
      className={clsx(
        'flex h-fit w-fit items-center justify-center self-start justify-self-center rounded px-1.5 py-0.5 text-xs font-bold shadow',
        {
          'bg-accent-500 text-white': title === '나의 위인전',
          'bg-primary-500 text-white': title === '감상문',
          'bg-success-500 text-white': title === '본인의 성격',
        },
      )}
    >
      {title}
    </div>
  );
}

export default TypeTag;
