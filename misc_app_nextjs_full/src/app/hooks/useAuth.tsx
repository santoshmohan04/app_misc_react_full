import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppSelector } from '../../lib/hooks';

export default function useAuth(redirectPath = '/login') {
    const useremail = useAppSelector((state) => state.user.email);
    const router = useRouter();

    useEffect(() => {
        if (!useremail) {
            router.replace(redirectPath);
        }
    }, [redirectPath, router, useremail]);
}
