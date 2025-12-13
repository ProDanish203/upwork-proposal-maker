export interface MinimalUser {
  _id: string;
  fullname: string;
  email: string;
}

export interface IUser {
  _id: string;
  fullname: string;
  email: string;
  introduction: string;
  roles: string[];
  skills: string[];
  githubUrl: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  otherLinks?: string;

  workExperiences: IworkExperience[];
  projects: IProject[];

  writingStyle: string;
  sampleProposal: string;
}

export interface IworkExperience {
  _id: string;
  jobTitle: string;
  description: string;
  startDate: string;
  endDate: string;
  ongoing: boolean;
  skills: string[];
}

export interface IProject {
  _id: string;
  title: string;
  description: string;
  link: string;
}
