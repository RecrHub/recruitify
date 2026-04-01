import { create } from 'zustand';
import type { Profile, WorkExperience, Education, Province } from '@/types/profile';

interface ProfileState {
  profile: Profile | null;
  workExperiences: WorkExperience[];
  educations: Education[];
  provinces: Province[];
  isLoading: boolean;
  error: string | null;

  setProfile: (profile: Profile) => void;
  setWorkExperiences: (experiences: WorkExperience[]) => void;
  addWorkExperience: (experience: WorkExperience) => void;
  updateWorkExperience: (id: number, experience: WorkExperience) => void;
  removeWorkExperience: (id: number) => void;
  setEducations: (educations: Education[]) => void;
  addEducation: (education: Education) => void;
  updateEducation: (id: number, education: Education) => void;
  removeEducation: (id: number) => void;
  setProvinces: (provinces: Province[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  profile: null,
  workExperiences: [],
  educations: [],
  provinces: [],
  isLoading: false,
  error: null,
};

export const useProfileStore = create<ProfileState>((set) => ({
  ...initialState,

  setProfile: (profile) => set({ profile }),

  setWorkExperiences: (workExperiences) => set({ workExperiences }),

  addWorkExperience: (experience) =>
    set((state) => ({
      workExperiences: [...state.workExperiences, experience],
    })),

  updateWorkExperience: (id, experience) =>
    set((state) => ({
      workExperiences: state.workExperiences.map((exp) =>
        exp.id === id ? experience : exp
      ),
    })),

  removeWorkExperience: (id) =>
    set((state) => ({
      workExperiences: state.workExperiences.filter((exp) => exp.id !== id),
    })),

  setEducations: (educations) => set({ educations }),

  addEducation: (education) =>
    set((state) => ({
      educations: [...state.educations, education],
    })),

  updateEducation: (id, education) =>
    set((state) => ({
      educations: state.educations.map((edu) =>
        edu.id === id ? education : edu
      ),
    })),

  removeEducation: (id) =>
    set((state) => ({
      educations: state.educations.filter((edu) => edu.id !== id),
    })),

  setProvinces: (provinces) => set({ provinces }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  reset: () => set(initialState),
}));
