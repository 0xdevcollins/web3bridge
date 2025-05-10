import { Tier } from '@/types/savings';

export const SAVINGS_TIERS: Tier[] = [
  {
    id: 1,
    name: 'Tier 1',
    amount: 10000,
    interestRate: 5,
  },
  {
    id: 2,
    name: 'Tier 2',
    amount: 20000,
    interestRate: 10,
  },
  {
    id: 3,
    name: 'Tier 3',
    amount: 30000,
    interestRate: 20,
  },
];

export const MAX_STUDENTS = 12; 
