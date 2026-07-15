import { render, screen } from '@testing-library/react';
import { mockJobs } from '../mockJobs';
import { JobDetailsPanel } from './JobDetailsPanel';

describe('JobDetailsPanel', () => {
  it('keeps the AI analysis action outside the scrollable job description', () => {
    render(<JobDetailsPanel job={mockJobs[0]} onClose={jest.fn()} />);

    const dialog = screen.getByRole('dialog', { name: 'Personal Assistant details' });
    const analysisButton = screen.getByRole('button', { name: 'Analyze Personal Assistant with AI' });

    expect(analysisButton).toHaveTextContent('Analysis AI');
    expect(analysisButton.parentElement).toBe(dialog);
  });
});
