import { IUser } from "@/types";
import mongoose, { Model, Schema } from "mongoose";

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Account with this email already exists"],
    },
    fullname: {
      type: String,
      required: [true, "Fullname is required"],
    },
    introduction: {
      type: String,
      required: [true, "Introduction is required"],
    },
    roles: {
      type: [String],
      required: [true, "At least one role is required"],
    },
    skills: {
      type: [String],
      required: [true, "At least one skill is required"],
    },
    githubUrl: {
      type: String,
      required: [true, "GitHub URL is required"],
    },
    onboarded: {
      type: Boolean,
      default: false,
    },
    portfolioUrl: String,
    linkedinUrl: String,
    otherLinks: String,
    writingStyle: {
      type: String,
      required: [true, "Writing style is required"],
    },
    sampleProposal: {
      type: String,
      required: [true, "Sample proposal is required"],
    },
  },
  { timestamps: true, versionKey: false, id: true }
);

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);
