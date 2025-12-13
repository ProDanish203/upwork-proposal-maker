import { IworkExperience } from "@/types";
import mongoose, { Model, Schema } from "mongoose";

const workExperienceSchema = new Schema<IworkExperience>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    jobTitle: {
      type: String,
      required: [true, "Job title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    startDate: {
      type: String,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: String,
      required: function (this: IworkExperience) {
        return !this.ongoing;
      },
    },
    ongoing: {
      type: Boolean,
      default: false,
    },
    skills: {
      type: [String],
      required: [true, "At least one skill is required"],
    },
  },
  { timestamps: true, versionKey: false, id: true }
);

export const WorkExperience: Model<IworkExperience> =
  mongoose.models.WorkExperience ||
  mongoose.model<IworkExperience>("WorkExperience", workExperienceSchema);
