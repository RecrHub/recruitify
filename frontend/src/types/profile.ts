export interface Province {
  code: string;
  name: string;
  fullName: string;
  fullNameEn?: string;
}

export interface Profile {
  accountId: number;
  fullName?: string;
  about?: string;
  title?: string;
  avatarUrl?: string;
  personalLink?: string;
  phoneNumber?: number;
  gender?: boolean;
  address?: string;
  dob?: string;
  provinceCode?: string;
  province?: Province;
}

export interface WorkExperience {
  id: number;
  userProfileId: number;
  jobTitle: string;
  companyName: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface Education {
  id: number;
  userProfileId: number;
  schoolName: string;
  degree?: string;
  fieldOfStudy?: string;
  startDate: string;
  endDate?: string;
}

export interface ProfileUpdateRequest {
  fullName?: string;
  about?: string;
  title?: string;
  avatarUrl?: string;
  personalLink?: string;
  phoneNumber?: number;
  gender?: boolean;
  address?: string;
  dob?: string;
  provinceCode?: string;
}

export interface WorkExperienceRequest {
  jobTitle: string;
  companyName: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface EducationRequest {
  schoolName: string;
  degree?: string;
  fieldOfStudy?: string;
  startDate: string;
  endDate?: string;
}

export interface FullProfile {
  profile: Profile;
  workExperiences: WorkExperience[];
  educations: Education[];
}
