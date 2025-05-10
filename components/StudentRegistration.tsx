'use client';

import { useState } from 'react';
import { useSavings } from '@/context/SavingsContext';
import { SAVINGS_TIERS } from '@/constants/savings';
import { Tier } from '@/types/savings';
import { useRouter } from 'next/navigation';
import { NairaIcon } from './NairaIcon';
import { Button } from './ui/button';

export default function StudentRegistration() {
  const [name, setName] = useState('');
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addStudent, calculateWeeklyInterest, calculateTotalAmount } = useSavings();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!name.trim()) {
      setError('Please enter your name');
      setIsSubmitting(false);
      return;
    }

    if (!selectedTier) {
      setError('Please select a savings tier');
      setIsSubmitting(false);
      return;
    }

    try {
      addStudent(name.trim(), selectedTier);
      await new Promise(resolve => setTimeout(resolve, 500));
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <label htmlFor="name" className="block text-lg font-medium text-gray-900 mb-2">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            placeholder="Enter your full name"
            disabled={isSubmitting}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Choose Your Savings Tier</h3>
          <div className="grid gap-4">
            {SAVINGS_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedTier?.id === tier.id
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-indigo-300'
                } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => !isSubmitting && setSelectedTier(tier)}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedTier?.id === tier.id ? 'border-indigo-500' : 'border-gray-300'
                  }`}>
                    {selectedTier?.id === tier.id && (
                      <div className="w-3 h-3 bg-indigo-500 rounded-full" />
                    )}
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">{tier.name}</h4>
                    <p className="text-gray-600">₦{tier.amount.toLocaleString()}</p>
                    <p className="text-sm text-indigo-600 font-medium">{tier.interestRate}% weekly interest</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedTier && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Your Weekly Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-indigo-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Weekly Interest</p>
                <p className="text-xl font-bold text-indigo-600">
                  <NairaIcon />{calculateWeeklyInterest({ id: '', name: '', tier: selectedTier, joinedAt: new Date(), weeklyInterest: 0, totalAmount: 0 }).toLocaleString()}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-xl font-bold text-green-600">
                  <NairaIcon />{calculateTotalAmount({ id: '', name: '', tier: selectedTier, joinedAt: new Date(), weeklyInterest: 0, totalAmount: 0 }).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
            {error}
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 px-6 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${
            isSubmitting
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:from-indigo-700 hover:to-purple-700'
          }`}
        >
          {isSubmitting ? 'Joining...' : 'Join Savings Group'}
        </Button>
      </form>
    </div>
  );
} 
