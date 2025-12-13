import { IUser } from "@/types";
import mongoose, { Model, Schema } from "mongoose";

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Account with this email already exists"],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
    fullname: {
      type: String,
      required: [true, "Fullname is required"],
    },
    onboarded: {
      type: Boolean,
      default: false,
    },
    age: Number,
    avatar: String,
    introduction: String,
    roles: {
      type: [String],
      default: [],
    },
    skills: {
      type: [String],
      default: [],
    },
    githubUrl: String,
    portfolioUrl: String,
    linkedinUrl: String,
    otherLinks: String,
    writingStyle: String,
    sampleProposal: String,
  },
  { timestamps: true, versionKey: false, id: true }
);

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);
