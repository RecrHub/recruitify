import { render, screen } from '@testing-library/react';
import JobCard from '@/components/JobCard';
import { generateMockJobs } from '@/components/JobCardList/mockdata';

describe('job mock data', () => {
  it('generates stable, varied job values', () => {
    const jobs = generateMockJobs(2);

    expect(jobs).toHaveLength(2);
    expect(jobs[0]).toMatchObject({
      id: 1,
      company: 'TechCorp',
      position: 'Frontend Developer',
      salary: '$50-100/hr',
      remote: true,
    });
    expect(jobs[1]).toMatchObject({
      id: 2,
      company: 'Hopin',
      position: 'Backend Developer',
      salary: '$60-110/hr',
      remote: false,
    });
    expect(generateMockJobs(2)).toEqual(jobs);
  });
});

describe('JobCard', () => {
  it('renders the company logo with accessible text', () => {
    render(
      <JobCard
        id={1}
        title="Frontend Developer"
        companyName="TechCorp"
        salaryRange="$50-100/hr"
        location="Remote"
        employmentType="Full-Time"
        createdAt="1 day ago"
        companyLogo="/assets/logo.jpg"
      />,
    );

    expect(screen.getByRole('img', { name: 'TechCorp' })).toBeInTheDocument();
  });
});
