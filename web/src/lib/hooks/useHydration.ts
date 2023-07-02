import { useEffect, useState } from 'react';
import { StoreApi, UseBoundStore, Mutate } from 'zustand';

type StoreWithPersist<S> = Mutate<StoreApi<S>, [['zustand/persist', S]]>;
type BoundStoreWithPersist<S> = UseBoundStore<StoreWithPersist<S>>;

const useHydration = <T>(boundStore: BoundStoreWithPersist<T>) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsubFinishHydration = boundStore.persist.onFinishHydration(() =>
      setHydrated(true),
    );

    setHydrated(boundStore.persist.hasHydrated());

    return () => {
      unsubFinishHydration();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return hydrated;
};

export default useHydration;
