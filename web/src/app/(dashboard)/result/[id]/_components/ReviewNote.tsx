import React from 'react';
import clsx from 'clsx';

function ReviewNote({ text, className }: { text: string; className: string }) {
  return (
    <article className={clsx('bg-white p-1.5', className)}>
      <div className="flex h-full max-h-full w-full flex-col items-center border shadow-lg scrollbar-hide">
        <h2 className="py-2 text-xl font-semibold">제출 답안</h2>
        <textarea
          className="w-full flex-1 resize-none overflow-y-scroll px-2 outline-none"
          defaultValue={text}
        />
      </div>
    </article>
  );
}

export default ReviewNote;
