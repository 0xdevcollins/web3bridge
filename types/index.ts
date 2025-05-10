export type Tier = 1 | 2 | 3;

export interface TierInfo {
  amount: number;
  interestRate: number;
}

export interface Member {
  id: string;
  name: string;
  tier: Tier;
  amount: number;
  interest: number;
  total: number;
}

export interface SavingsGroup {
  members: Member[];
  totalSaved: number;
  week: number;
} 