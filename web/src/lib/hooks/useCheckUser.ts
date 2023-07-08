import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/authStore';

const useCheckUser = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (typeof window !== 'undefined' && user) {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useCheckUser;
