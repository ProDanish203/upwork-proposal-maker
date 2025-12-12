import { OnboardingData } from "@/types";
import { create } from "zustand";

interface OnboardingStore extends OnboardingData {
  // Step 1
  setFullname: (fullname: string) => void;
  setAge: (age: string) => void;
  setIntroduction: (introduction: string) => void;
  setRoles: (roles: string[]) => void;
  removeRole: (role: string) => void;
  setSkills: (skills: string[]) => void;
  removeSkill: (skill: string) => void;

  // Step 2
  setGithubUrl: (githubUrl: string) => void;
  setPortfolioUrl: (portfolioUrl: string) => void;
  setLinkedinUrl: (linkedinUrl: string) => void;
  setOtherLinks: (otherLinks: string) => void;
  // Step 3
  setWorkExperiences: (
    workExperiences: OnboardingData["workExperiences"]
  ) => void;
  // Step 4
  setProjects: (projects: OnboardingData["projects"]) => void;
  // Step 5
  setWritingStyle: (writingStyle: string) => void;
  setSampleProposal: (sampleProposal: string) => void;
}

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  // Step 1
  fullname: "",
  setFullname: (fullname) => set({ fullname }),
  age: "",
  setAge: (age) => set({ age }),

  introduction: "",
  setIntroduction: (introduction) => set({ introduction }),
  roles: [],
  setRoles: (roles) => set({ roles }),
  removeRole: (role) =>
    set((state) => ({
      roles: state.roles.filter((r) => r !== role),
    })),
  skills: [],
  setSkills: (skills) => set({ skills }),
  removeSkill: (skill) =>
    set((state) => ({
      skills: state.skills.filter((s) => s !== skill),
    })),

  // Step 2
  githubUrl: "",
  setGithubUrl: (githubUrl) => set({ githubUrl }),
  portfolioUrl: "",
  setPortfolioUrl: (portfolioUrl) => set({ portfolioUrl }),
  linkedinUrl: "",
  setLinkedinUrl: (linkedinUrl) => set({ linkedinUrl }),
  otherLinks: "",
  setOtherLinks: (otherLinks) => set({ otherLinks }),
  // Step 3

  workExperiences: [
    {
      id: "1",
      jobTitle: "",
      description: "",
      startDate: "",
      endDate: "",
      ongoing: false,
      skills: [],
    },
  ],
  setWorkExperiences: (workExperiences) => set({ workExperiences }),
  // Step 4
  projects: [{ id: "1", title: "", description: "", link: "" }],
  setProjects: (projects) => set({ projects }),
  // Step 5
  writingStyle: "",
  setWritingStyle: (writingStyle) => set({ writingStyle }),
  sampleProposal: "",
  setSampleProposal: (sampleProposal) => set({ sampleProposal }),
}));
