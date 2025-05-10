export type Tier = {
  id: number;
  name: string;
  amount: number;
  interestRate: number;
};

export type Student = {
  id: string;
  name: string;
  tier: Tier;
  joinedAt: Date;
  weeklyInterest: number;
  totalAmount: number;
};

export type SavingsGroup = {
  students: Student[];
  totalSavings: number;
  totalInterest: number;
}; 
