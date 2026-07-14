import type { EmployerJobListItem } from './types';
import {
  formatSalary,
  getCategoryLabel,
  getEmploymentTypeLabel,
  getExperienceLevelLabel,
  getWardLabel,
  getWorkApproachLabel,
} from './jobDisplay';

const sharedDetails = {
  requirement:
    '5-7 years of UX experience in an Enterprise or retail environment.\nExperience working with agile software development teams.\nDemonstrated ability to initiate and self-manage complex projects.',
  responsibilities:
    'Integrate accessibility best practices throughout the design process.\nSupport designers through documentation, partnership, and review.\nPartner with research and engineering teams to improve product quality.',
  benefit: 'Competitive salary, modern tooling, flexible work, and growth support.',
  minSalary: 80000,
  maxSalary: 100000,
  isHidden: false,
  isFeatured: false,
  companyId: 1,
  employmentTypeId: 1,
  experienceLevelId: 3,
  workApproachId: 3,
  wardCode: 'CA-ON',
  applicants: 154,
  description:
    'As a Senior Product Designer on the Accessibility team, you will establish accessible product practices, collaborate across teams, and improve inclusive user experiences.',
  education: 'B.sc in Computer Science or any engineering subjects',
  skills: ['Product Design', 'UI/UX Design', 'Prototyping', 'Interaction Design', 'Wireframe', 'Design System'],
  qualifications: [
    '5-7 years of UX experience in an Enterprise or retail environment.',
    'Experience working with agile software development teams.',
    'Demonstrated ability to initiate and self-manage complex projects.',
  ],
};

const withDisplayText = (
  job: Omit<
    EmployerJobListItem,
    | 'categoryText'
    | 'employmentTypeText'
    | 'experienceLevelText'
    | 'workApproachText'
    | 'salaryText'
    | 'locationText'
  >,
): EmployerJobListItem => ({
  ...job,
  categoryText: getCategoryLabel(job.categoryId),
  employmentTypeText: getEmploymentTypeLabel(job.employmentTypeId),
  experienceLevelText: getExperienceLevelLabel(job.experienceLevelId),
  workApproachText: getWorkApproachLabel(job.workApproachId),
  salaryText: formatSalary(job.minSalary, job.maxSalary),
  locationText: getWardLabel(job.wardCode),
});

export const mockJobs: EmployerJobListItem[] = [
  withDisplayText({
    ...sharedDetails,
    id: 1,
    title: 'Personal Assistant',
    categoryId: 1,
    status: 'open',
    matched: 40,
    workApproachId: 1,
  }),
  withDisplayText({
    ...sharedDetails,
    id: 2,
    title: 'Junior HR Manager',
    categoryId: 1,
    status: 'open',
    matched: 40,
    workApproachId: 2,
    wardCode: 'IN-DL',
  }),
  withDisplayText({
    ...sharedDetails,
    id: 3,
    title: 'Senior Product Designer',
    categoryId: 2,
    status: 'hold',
    matched: 40,
    wardCode: 'US-NY',
    isFeatured: true,
  }),
  withDisplayText({
    ...sharedDetails,
    id: 4,
    title: 'Associate Product Designer',
    categoryId: 3,
    status: 'closed',
    matched: 40,
    workApproachId: 1,
    wardCode: 'UK-LDN',
    isHidden: true,
  }),
  withDisplayText({
    ...sharedDetails,
    id: 5,
    title: 'Software Developer',
    categoryId: 4,
    status: 'closed',
    matched: 40,
    wardCode: 'UK-LDN',
    isHidden: true,
  }),
  withDisplayText({
    ...sharedDetails,
    id: 6,
    title: 'Customer Success Manager',
    categoryId: 1,
    status: 'open',
    matched: 40,
    wardCode: 'IN-DL',
  }),
];
