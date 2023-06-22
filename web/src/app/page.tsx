import React from 'react';
import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <main className="relative">
      <button className="absolute" type="button">
        학년 선택
        <ChevronDoubleRightIcon className="h-9 text-secondary-600" />
      </button>
      <label htmlFor="qa" className="flex ">
        문항 선택
        <select id="qa" name="qa">
          <option value="1">1번</option>
        </select>
      </label>
    </main>
  );
}
