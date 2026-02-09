'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-client';

export default function HomePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  // const { session } = useAuth();

  useEffect(() => {
    if (!isPending) {
    if (session) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }
  }, [session,isPending, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-50">
      <p className="text-neutral-500">
        {isPending ? 'Loading...' : 'Redirecting...'}
      </p>
    </div>
  );
}