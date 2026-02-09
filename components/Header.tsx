'use client';

import { useAuth } from '@better-auth/react';
import { LogOut, User } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const { session, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-primary-500">TodoApp</span>
            </Link>
          </div>
          <div className="flex items-center">
            {session?.user && (
              <div className="ml-3 relative">
                <div className="flex items-center space-x-3">
                  <div className="text-right hidden md:block">
                    <p className="text-sm font-medium text-neutral-800">{session.user.name}</p>
                    <p className="text-xs text-neutral-500">{session.user.email}</p>
                  </div>
                  <div className="relative">
                    <div className="bg-primary-100 rounded-full p-2">
                      <User className="h-5 w-5 text-primary-500" />
                    </div>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center text-sm rounded-md text-neutral-500 hover:text-neutral-700 focus:outline-none"
                    title="Sign out"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}