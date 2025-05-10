import { render, screen, fireEvent } from '@testing-library/react';
import SavingsDashboard from '../SavingsDashboard';
import { SavingsProvider } from '@/context/SavingsContext';
import { MAX_STUDENTS } from '@/constants/savings';

const mockSavingsGroup = {
  students: [
    {
      id: '1',
      name: 'Collins ike',
      tier: {
        id: '1',
        name: 'Tier 1',
        amount: 10000,
        interestRate: 5
      },
      weeklyInterest: 500,
      totalAmount: 10500
    },
    {
      id: '2',
      name: 'Collins Ikechukwu',
      tier: {
        id: '2',
        name: 'Tier 2',
        amount: 20000,
        interestRate: 10
      },
      weeklyInterest: 2000,
      totalAmount: 22000
    }
  ],
  totalSavings: 30000,
  totalInterest: 2500
};

const mockRemoveStudent = jest.fn();

jest.mock('@/context/SavingsContext', () => ({
  useSavings: () => ({
    savingsGroup: mockSavingsGroup,
    removeStudent: mockRemoveStudent
  }),
  SavingsProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

describe('SavingsDashboard', () => {
  const renderWithProvider = (component: React.ReactNode) => {
    return render(<SavingsProvider>{component}</SavingsProvider>);
  };

  beforeEach(() => {
    mockRemoveStudent.mockClear();
  });

  it('renders dashboard with correct title and member count', () => {
    renderWithProvider(<SavingsDashboard />);
    
    expect(screen.getByText('Savings Dashboard')).toBeInTheDocument();
    expect(screen.getByText(`Members: ${mockSavingsGroup.students.length}/${MAX_STUDENTS}`)).toBeInTheDocument();
  });

  it('displays total savings and interest correctly', () => {
    renderWithProvider(<SavingsDashboard />);
    
    expect(screen.getByText('Total Savings')).toBeInTheDocument();
    expect(screen.getByText('Total Interest')).toBeInTheDocument();
    expect(screen.getByText(mockSavingsGroup.totalSavings.toLocaleString())).toBeInTheDocument();
    expect(screen.getByText(mockSavingsGroup.totalInterest.toLocaleString())).toBeInTheDocument();
  });

  it('renders student details table with correct headers', () => {
    renderWithProvider(<SavingsDashboard />);
    
    const headers = [
      'Name',
      'Tier',
      'Amount',
      'Weekly Interest',
      'Total Amount',
      'Actions'
    ];

    headers.forEach(header => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  it('displays student information correctly in the table', () => {
    renderWithProvider(<SavingsDashboard />);
    
    expect(screen.getByText('Collins ike')).toBeInTheDocument();
    expect(screen.getByText('Tier 1')).toBeInTheDocument();
    expect(screen.getByText('10,000')).toBeInTheDocument();
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('10,500')).toBeInTheDocument();

    expect(screen.getByText('Collins Ikechukwu')).toBeInTheDocument();
    expect(screen.getByText('Tier 2')).toBeInTheDocument();
    expect(screen.getByText('20,000')).toBeInTheDocument();
    expect(screen.getByText('2,000')).toBeInTheDocument();
    expect(screen.getByText('22,000')).toBeInTheDocument();
  });

  it('calls removeStudent when withdraw button is clicked', () => {
    renderWithProvider(<SavingsDashboard />);
    
    const withdrawButtons = screen.getAllByText('Withdraw');
    fireEvent.click(withdrawButtons[0]);
    
    expect(mockRemoveStudent).toHaveBeenCalledWith('1');
  });
}); 
