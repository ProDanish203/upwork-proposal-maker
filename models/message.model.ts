import { IMessage, Sender } from "@/types";
import mongoose, { Model, Schema } from "mongoose";

const messageSchema = new Schema<IMessage>(
  {
    chatId: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
      required: [true, "Chat ID is required"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    sender: {
      type: String,
      enum: Object.values(Sender),
      required: [true, "Sender is required"],
    },
  },
  { timestamps: true, versionKey: false, id: true }
);

export const Message: Model<IMessage> =
  mongoose.models.Message || mongoose.model<IMessage>("Message", messageSchema);
