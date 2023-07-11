import React from 'react';
import Note from '@/components/Note';

function ReviewNote({ className, text }: { className?: string; text: string }) {
  return (
    <div className={className}>
      <Note
        title="제출 답안"
        className="gap-y-3 px-6 py-4"
        readonly
        text={text}
      />
    </div>
  );
}

export default ReviewNote;
