import { IProject } from "@/types";
import mongoose, { Model, Schema } from "mongoose";

const projectSchema = new Schema<IProject>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    link: {
      type: String,
      required: [true, "Link is required"],
    },
  },
  { timestamps: true, versionKey: false, id: true }
);

export const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", projectSchema);

