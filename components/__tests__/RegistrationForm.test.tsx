import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StudentRegistration from '../StudentRegistration';
import { SavingsProvider } from '@/context/SavingsContext';

const pushMock = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
}));

describe('RegistrationForm', () => {
  const renderWithProvider = (component: React.ReactNode) => {
    return render(<SavingsProvider>{component}</SavingsProvider>);
  };

  beforeEach(() => {
    pushMock.mockClear();
  });

  it('renders registration form', () => {
    renderWithProvider(<StudentRegistration />);
    expect(screen.getByLabelText('Your Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your full name')).toBeInTheDocument();
    expect(screen.getByText('Choose Your Savings Tier')).toBeInTheDocument();
  });

  it('validates name input', async () => {
    renderWithProvider(<StudentRegistration />);
    const submitButton = screen.getByRole('button', { name: /join savings group/i });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText('Please enter your name')).toBeInTheDocument();
    });
  });

  it('validates tier selection', async () => {
    renderWithProvider(<StudentRegistration />);
    const nameInput = screen.getByPlaceholderText('Enter your full name');
    const submitButton = screen.getByRole('button', { name: /join savings group/i });
    await userEvent.type(nameInput, 'John Doe');
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText('Please select a savings tier')).toBeInTheDocument();
    });
  });

  it('submits form with valid data', async () => {
    renderWithProvider(<StudentRegistration />);
    const nameInput = screen.getByPlaceholderText('Enter your full name');
    const submitButton = screen.getByRole('button', { name: /join savings group/i });
    await userEvent.type(nameInput, 'John Doe');
    const tier1 = screen.getByText('Tier 1');
    fireEvent.click(tier1);
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /joining/i })).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/');
    });
  });
}); 
