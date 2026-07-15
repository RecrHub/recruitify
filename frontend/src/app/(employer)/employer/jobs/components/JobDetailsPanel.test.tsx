import { fireEvent, render, screen } from '@testing-library/react';
import { mockJobs } from '../mockJobs';
import { JobDetailsPanel } from './JobDetailsPanel';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe('JobDetailsPanel', () => {
  beforeEach(() => mockPush.mockClear());

  it('keeps the AI analysis action outside the scrollable job description', () => {
    render(<JobDetailsPanel job={mockJobs[0]} onClose={jest.fn()} />);

    const dialog = screen.getByRole('dialog', { name: 'Personal Assistant details' });
    const analysisButton = screen.getByRole('button', { name: 'Analyze Personal Assistant with AI' });

    expect(analysisButton).toHaveTextContent('AI Analysis');
    expect(analysisButton.parentElement).toBe(dialog);
  });

  it('asks for confirmation before starting AI analysis', async () => {
    render(<JobDetailsPanel job={mockJobs[0]} onClose={jest.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: 'Analyze Personal Assistant with AI' }));

    expect(await screen.findByText('AI Analysis Confirmation')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Would you like AI to analyze this job posting and provide optimization suggestions? This process may take a few seconds to analyze the data and deliver the most accurate results.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Analysis now' }));

    expect(mockPush).toHaveBeenCalledWith('/employer/jobs/1/ai-analysis');
  });
});
