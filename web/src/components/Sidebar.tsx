import React from 'react';
import {
  ClipboardDocumentIcon,
  ClipboardDocumentListIcon,
  MegaphoneIcon,
  PencilSquareIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

export default function Sidebar() {
  return (
    <div className="col-span-1 row-span-1 flex flex-1 flex-col border-r py-2 text-secondary-600">
      <div className="flex items-center justify-center py-4">
        <button type="button" className="flex flex-col items-center gap-y-2">
          <PencilSquareIcon className="h-9 text-secondary-600" />
          글쓰기
        </button>
      </div>
      <div className="flex items-center justify-center py-4">
        <button type="button" className="flex flex-col items-center gap-y-2">
          <ClipboardDocumentListIcon className="h-9 text-secondary-600" />
          채점내역
        </button>
      </div>
      <div className="flex items-center justify-center py-4">
        <button type="button" className="flex flex-col items-center gap-y-2">
          <UserCircleIcon className="h-9 text-secondary-600" />내 정보
        </button>
      </div>
      <div className="flex items-center justify-center py-4">
        <button type="button" className="flex flex-col items-center gap-y-2">
          <MegaphoneIcon className="h-9 text-secondary-600" />
          문의하기
        </button>
      </div>
    </div>
  );
}
