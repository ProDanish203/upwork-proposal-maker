export interface WorkExperience {
  id: string;
  jobTitle: string;
  description: string;
  startDate: string;
  endDate: string;
  ongoing: boolean;
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  link: string;
}
