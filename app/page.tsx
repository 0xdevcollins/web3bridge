'use client';

import SavingsDashboard from '@/components/SavingsDashboard';
import Link from 'next/link';

export default function Home() {
  return (
   <main className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Web3Bridge Savings Group
            </h1>
            <Link
              href="/register"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Join Savings Group
            </Link>
          </div>

          <SavingsDashboard />

          
        </div>
      </main>
  );
} 
