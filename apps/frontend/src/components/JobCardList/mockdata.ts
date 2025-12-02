// mocks/jobMockData.ts

import type { Job, JobType, ExperienceLevel } from './type';

/**
 * Mock Job Data - Sample jobs for testing
 */
export const mockJobs: Job[] = [
  {
    id: 1,
    company: 'Hopin',
    position: 'Frontend Developer',
    logo: '/assets/logo.jpg',
    salary: '$90-120/hr',
    location: 'Hybrid, North America',
    timezone: 'UTC-5',
    hours: '20+ hrs/wk',
    posted: 'Posted Apr 6, 2025',
    skills: ['Tailwind CSS', 'React.js', 'JavaScript', 'CSS3', 'TypeScript'],
    type: 'Full-Time',
    experienceLevel: 'Intermediate',
    remote: true,
  },
  {
    id: 2,
    company: 'TechCorp',
    position: 'Senior Backend Engineer',
    logo: '/assets/logo.jpg',
    salary: '$120-150/hr',
    location: 'Remote',
    timezone: 'UTC-8',
    hours: '40 hrs/wk',
    posted: 'Posted Apr 5, 2025',
    skills: ['Node.js', 'PostgreSQL', 'Docker', 'AWS', 'GraphQL'],
    type: 'Full-Time',
    experienceLevel: 'Expert',
    remote: true,
  },
  {
    id: 3,
    company: 'DesignHub',
    position: 'UI/UX Designer',
    logo: '/assets/logo.jpg',
    salary: '$70-100/hr',
    location: 'New York, USA',
    timezone: 'EST',
    hours: '30 hrs/wk',
    posted: 'Posted Apr 4, 2025',
    skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research'],
    type: 'Part-Time',
    experienceLevel: 'Intermediate',
    remote: false,
  },
  {
    id: 4,
    company: 'DataMinds',
    position: 'Data Scientist',
    logo: '/assets/logo.jpg',
    salary: '$100-130/hr',
    location: 'San Francisco, USA',
    timezone: 'PST',
    hours: '40 hrs/wk',
    posted: 'Posted Apr 3, 2025',
    skills: ['Python', 'TensorFlow', 'SQL', 'Machine Learning', 'Data Visualization'],
    type: 'Full-Time',
    experienceLevel: 'Expert',
    remote: true,
  },
  {
    id: 5,
    company: 'MobileFirst',
    position: 'React Native Developer',
    logo: '/assets/logo.jpg',
    salary: '$80-110/hr',
    location: 'Remote, Europe',
    timezone: 'CET',
    hours: '40 hrs/wk',
    posted: 'Posted Apr 2, 2025',
    skills: ['React Native', 'iOS', 'Android', 'Redux', 'Firebase'],
    type: 'Contract',
    experienceLevel: 'Intermediate',
    remote: true,
  },
];

/**
 * Generate mock jobs with custom count
 * @param count - Number of jobs to generate
 * @returns Array of generated jobs
 */
export const generateMockJobs = (count: number = 10): Job[] => {
  const positions = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Engineer',
    'UI/UX Designer',
    'Product Manager',
    'DevOps Engineer',
    'Data Scientist',
    'Mobile Developer',
    'QA Engineer',
    'Security Engineer',
  ];

  const companies = [
    'TechCorp',
    'Hopin',
    'DesignHub',
    'DataMinds',
    'MobileFirst',
    'CloudSystems',
    'AILabs',
    'CyberSafe',
    'Innovation Inc',
    'StartupHub',
  ];

  const locations = [
    'Remote',
    'New York, USA',
    'San Francisco, USA',
    'London, UK',
    'Berlin, Germany',
    'Singapore',
    'Toronto, Canada',
    'Sydney, Australia',
    'Hybrid, North America',
    'Hybrid, Europe',
  ];

  const timezones = ['UTC-8', 'UTC-5', 'EST', 'PST', 'GMT', 'CET', 'UTC+8', 'AEST'];

  const skillSets = [
    ['React', 'TypeScript', 'Node.js', 'CSS3', 'Webpack'],
    ['Python', 'Django', 'PostgreSQL', 'Redis', 'Docker'],
    ['Vue.js', 'JavaScript', 'Express', 'MongoDB', 'AWS'],
    ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research'],
    ['Java', 'Spring Boot', 'MySQL', 'Microservices', 'Kubernetes'],
    ['React Native', 'iOS', 'Android', 'Redux', 'Firebase'],
    ['Python', 'TensorFlow', 'Machine Learning', 'SQL', 'Data Visualization'],
    ['Angular', 'RxJS', 'NestJS', 'GraphQL', 'TypeORM'],
  ];

  const types: JobType[] = ['Full-Time', 'Part-Time', 'Contract', 'Freelance'];
  const experienceLevels: ExperienceLevel[] = ['Entry Level', 'Intermediate', 'Expert'];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    company: companies[Math.floor(Math.random() * companies.length)],
    position: positions[Math.floor(Math.random() * positions.length)],
    logo: '/assets/logo.jpg',
    salary: `$${50 + Math.floor(Math.random() * 100)}-${100 + Math.floor(Math.random() * 100)}/hr`,
    location: locations[Math.floor(Math.random() * locations.length)],
    timezone: timezones[Math.floor(Math.random() * timezones.length)],
    hours: `${20 + Math.floor(Math.random() * 20)}+ hrs/wk`,
    posted: `Posted ${Math.floor(Math.random() * 30) + 1} days ago`,
    skills: skillSets[Math.floor(Math.random() * skillSets.length)],
    type: types[Math.floor(Math.random() * types.length)],
    experienceLevel: experienceLevels[Math.floor(Math.random() * experienceLevels.length)],
    remote: Math.random() > 0.5,
  }));
};

/**
 * Mock API call - Simulates fetching jobs from server
 * @param params - Request parameters
 * @returns Promise with jobs response
 */
export const fetchMockJobs = async (params?: {
  page?: number;
  limit?: number;
  delay?: number;
}): Promise<{
  jobs: Job[];
  total: number;
  page: number;
  limit: number;
}> => {
  const { page = 1, limit = 12, delay = 500 } = params || {};

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, delay));

  const allJobs = generateMockJobs(50);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const jobs = allJobs.slice(startIndex, endIndex);

  return {
    jobs,
    total: allJobs.length,
    page,
    limit,
  };
};

/**
 * Filter jobs by criteria
 * @param jobs - Array of jobs
 * @param filters - Filter criteria
 * @returns Filtered jobs
 */
export const filterJobs = (
  jobs: Job[],
  filters: {
    type?: JobType[];
    experienceLevel?: ExperienceLevel[];
    remote?: boolean;
    searchKeyword?: string;
  }
): Job[] => {
  let filtered = jobs;

  // Filter by job type
  if (filters.type && filters.type.length > 0) {
    filtered = filtered.filter((job) => filters.type!.includes(job.type!));
  }

  // Filter by experience level
  if (filters.experienceLevel && filters.experienceLevel.length > 0) {
    filtered = filtered.filter((job) =>
      filters.experienceLevel!.includes(job.experienceLevel!)
    );
  }

  // Filter by remote
  if (filters.remote !== undefined) {
    filtered = filtered.filter((job) => job.remote === filters.remote);
  }

  // Filter by search keyword
  if (filters.searchKeyword) {
    const keyword = filters.searchKeyword.toLowerCase();
    filtered = filtered.filter(
      (job) =>
        job.position.toLowerCase().includes(keyword) ||
        job.company.toLowerCase().includes(keyword) ||
        job.skills.some((skill) => skill.toLowerCase().includes(keyword))
    );
  }

  return filtered;
};

export default {
  mockJobs,
  generateMockJobs,
  fetchMockJobs,
  filterJobs,
};