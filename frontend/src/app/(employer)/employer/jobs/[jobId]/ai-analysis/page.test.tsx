import { render, screen } from '@testing-library/react';
import AiAnalysisPage from './page';

describe('AI analysis results page', () => {
  it('presents job quality, market comparison, and recommendations', () => {
    render(<AiAnalysisPage />);

    expect(screen.getByRole('heading', { level: 1, name: 'Senior SQL Developer' })).toBeInTheDocument();
    expect(screen.getByText('Job completeness')).toBeInTheDocument();
    expect(screen.getByText('Top-performing similar job')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Market comparison' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'AI recommendations' })).toBeInTheDocument();
    expect(screen.getByText('92.1% match')).toBeInTheDocument();
  });
});
