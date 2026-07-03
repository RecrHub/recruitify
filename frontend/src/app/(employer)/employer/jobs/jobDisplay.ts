const categoryLabel: Record<number, string> = {
  1: 'Administrative',
  2: 'Product',
  3: 'Marketing',
  4: 'Engineering',
};

const employmentTypeLabel: Record<number, string> = {
  1: 'Full-time/part-time',
  2: 'Full-time',
  3: 'Part-time',
};

const experienceLevelLabel: Record<number, string> = {
  1: 'Entry level',
  2: 'Mid level',
  3: 'Senior level',
};

const workApproachLabel: Record<number, string> = {
  1: 'Onsite',
  2: 'Hybrid',
  3: 'Remote',
};

const wardLabel: Record<string, string> = {
  'CA-ON': 'Canada',
  'US-NY': 'USA',
  'IN-DL': 'India',
  'UK-LDN': 'UK',
};

export const getCategoryLabel = (categoryId: number) => categoryLabel[categoryId] ?? `Category #${categoryId}`;

export const getEmploymentTypeLabel = (employmentTypeId: number) =>
  employmentTypeLabel[employmentTypeId] ?? `Employment type #${employmentTypeId}`;

export const getExperienceLevelLabel = (experienceLevelId: number) =>
  experienceLevelLabel[experienceLevelId] ?? `Experience level #${experienceLevelId}`;

export const getWorkApproachLabel = (workApproachId: number) =>
  workApproachLabel[workApproachId] ?? `Work approach #${workApproachId}`;

export const getWardLabel = (wardCode: string) => wardLabel[wardCode] ?? wardCode;

export const formatSalary = (minSalary: number, maxSalary: number) =>
  `$${Math.round(minSalary / 1000)}K - $${Math.round(maxSalary / 1000)}K`;
