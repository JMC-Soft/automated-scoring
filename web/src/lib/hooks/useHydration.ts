import { useEffect, useState } from 'react';
import { StoreApi, UseBoundStore, Mutate } from 'zustand';

type StoreWithPersist<S> = Mutate<StoreApi<S>, [['zustand/persist', S]]>;
type BoundStoreWithPersist<S> = UseBoundStore<StoreWithPersist<S>>;

const useHydration = <T>(boundStore: BoundStoreWithPersist<T>) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Note: This is just in case you want to take into account manual rehydration.
    // You can remove the following line if you don't need it.
    // const unsubHydrate = boundStore.persist.onHydrate(() => setHydrated(false));

    const unsubFinishHydration = boundStore.persist.onFinishHydration(() =>
      setHydrated(true),
    );

    setHydrated(boundStore.persist.hasHydrated());

    return () => {
      // unsubHydrate();
      unsubFinishHydration();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return hydrated;
};

export default useHydration;
