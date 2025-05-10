import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Student, SavingsGroup, Tier } from '@/types/savings';
import { MAX_STUDENTS } from '@/constants/savings';

interface SavingsContextType {
  savingsGroup: SavingsGroup;
  addStudent: (name: string, tier: Tier) => void;
  removeStudent: (studentId: string) => void;
  calculateWeeklyInterest: (student: Student) => number;
  calculateTotalAmount: (student: Student) => number;
}

const SavingsContext = createContext<SavingsContextType | undefined>(undefined);

const STORAGE_KEY = 'savings-group-data';

export function SavingsProvider({ children }: { children: ReactNode }) {
  const [savingsGroup, setSavingsGroup] = useState<SavingsGroup>(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        parsed.students = parsed.students.map((student: Student) => ({
          ...student,
          joinedAt: new Date(student.joinedAt)
        }));
        return parsed;
      }
    }
    return {
      students: [],
      totalSavings: 0,
      totalInterest: 0,
    };
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savingsGroup));
    }
  }, [savingsGroup]);

  const calculateWeeklyInterest = (student: Student) => {
    return (student.tier.amount * student.tier.interestRate) / 100;
  };

  const calculateTotalAmount = (student: Student) => {
    return student.tier.amount + calculateWeeklyInterest(student);
  };

  const addStudent = (name: string, tier: Tier) => {
    if (savingsGroup.students.length >= MAX_STUDENTS) {
      throw new Error('Maximum number of students reached');
    }

    const newStudent: Student = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      tier,
      joinedAt: new Date(),
      weeklyInterest: calculateWeeklyInterest({ id: '', name, tier, joinedAt: new Date(), weeklyInterest: 0, totalAmount: 0 }),
      totalAmount: calculateTotalAmount({ id: '', name, tier, joinedAt: new Date(), weeklyInterest: 0, totalAmount: 0 }),
    };

    setSavingsGroup((prev) => ({
      students: [...prev.students, newStudent],
      totalSavings: prev.totalSavings + tier.amount,
      totalInterest: prev.totalInterest + newStudent.weeklyInterest,
    }));
  };

  const removeStudent = (studentId: string) => {
    setSavingsGroup((prev) => {
      const student = prev.students.find((s) => s.id === studentId);
      if (!student) return prev;

      return {
        students: prev.students.filter((s) => s.id !== studentId),
        totalSavings: prev.totalSavings - student.tier.amount,
        totalInterest: prev.totalInterest - student.weeklyInterest,
      };
    });
  };

  return (
    <SavingsContext.Provider
      value={{
        savingsGroup,
        addStudent,
        removeStudent,
        calculateWeeklyInterest,
        calculateTotalAmount,
      }}
    >
      {children}
    </SavingsContext.Provider>
  );
}

export function useSavings() {
  const context = useContext(SavingsContext);
  if (context === undefined) {
    throw new Error('useSavings must be used within a SavingsProvider');
  }
  return context;
} 
