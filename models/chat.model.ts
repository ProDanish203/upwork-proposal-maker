import { IChat } from "@/types";
import mongoose, { Model, Schema } from "mongoose";

const chatSchema = new Schema<IChat>(
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
  },
  { timestamps: true, versionKey: false, id: true }
);

export const Chat: Model<IChat> =
  mongoose.models.Chat || mongoose.model<IChat>("Chat", chatSchema);
