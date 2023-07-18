import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/authStore';

const useCheckUser = () => {
  // const initialized = useRef(false);

  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    // if (!initialized.current) {
    //   if (typeof window !== 'undefined' && user) {
    //     router.push('/');
    //   }
    //   initialized.current = true;
    // }
    if (typeof window !== 'undefined' && user) {
      router.push('/');
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
};

export default useCheckUser;
