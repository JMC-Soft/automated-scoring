import { useLayoutEffect, useRef } from 'react';
import useEssayStore from '@/store/subjectStore';
import useHydration from '@/lib/hooks/useHydration';

export default function useConfirm(callback: () => void) {
  const checked = useRef<boolean>(false);

  const isHydrated = useHydration(useEssayStore);

  useLayoutEffect(() => {
    if (!isHydrated || checked.current) return;

    callback();
    checked.current = true;
  }, [isHydrated, callback]);
}
