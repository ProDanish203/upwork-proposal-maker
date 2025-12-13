import { Project, WorkExperience } from "./common.types";

export interface OnboardingData {
  // Step 1
  fullname: string;
  age: string;
  avatar?: string;
  introduction: string;
  roles: string[];
  skills: string[];

  //   Step 2
  githubUrl: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  otherLinks?: string;

  //   Step 3
  workExperiences: WorkExperience[];

  //   Step 4
  projects: Project[];

  //   Step 5
  writingStyle: string;
  sampleProposal: string;
}
