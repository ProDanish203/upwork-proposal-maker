import { Document, Types } from "mongoose";

export interface IUser extends Document {
  onboarded: boolean;
  fullname: string;
  email: string;
  password: string;
  avatar?: string;
  age: number;
  introduction?: string;
  roles: string[];
  skills: string[];

  githubUrl?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  otherLinks?: string;

  writingStyle?: string;
  sampleProposal?: string;
}

export interface IworkExperience extends Document {
  userId: Types.ObjectId;
  jobTitle: string;
  description: string;
  startDate: string;
  endDate: string;
  ongoing: boolean;
  skills: string[];
}

export interface IProject extends Document {
  userId: Types.ObjectId;
  title: string;
  description: string;
  link: string;
}

export interface IChat extends Document {
  userId: Types.ObjectId;
  title: string;
}

export enum Sender {
  USER = "user",
  AI = "AI",
}

export interface IMessage extends Document {
  chatId: Types.ObjectId;
  sender: Sender;
  content: string;
}
