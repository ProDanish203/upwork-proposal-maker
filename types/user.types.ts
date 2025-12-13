export interface MinimalUser {
  _id: string;
  fullname: string;
  email: string;
  avatar?: string;
  onboarded: boolean;
}

export interface UpdateProfileRequest {
  // Step 1
  fullname?: string;
  age?: number;
  avatar?: string;
  introduction?: string;
  roles?: string[];
  skills?: string[];

  // Step 2
  githubUrl?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  otherLinks?: string;

  // Step 3
  workExperiences?: Array<{
    _id?: string;
    jobTitle: string;
    description: string;
    startDate: string;
    endDate: string;
    ongoing: boolean;
    skills: string[];
  }>;

  // Step 4
  projects?: Array<{
    _id?: string;
    title: string;
    description: string;
    link: string;
  }>;

  // Step 5
  writingStyle?: string;
  sampleProposal?: string;
  onboarded?: boolean;
}
