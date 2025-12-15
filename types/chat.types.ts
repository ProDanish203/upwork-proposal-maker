import type { InferUITool, UIMessage } from "ai";
import type { getWeather } from "@/lib/ai/tools/get-weather";
import z from "zod";

export interface Chat {
  _id: string;
  userId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export const messageMetadataSchema = z.object({
  createdAt: z.string(),
  updatedAt: z.string().optional(),
});

export type MessageMetadata = z.infer<typeof messageMetadataSchema>;

export type CustomUIDataTypes = {
  _id: string;
  title: string;
  userId: string;
};

type weatherTool = InferUITool<typeof getWeather>;

export type ChatTools = {
  getWeather: weatherTool;
};

export type ChatMessage = UIMessage<
  MessageMetadata,
  CustomUIDataTypes,
  ChatTools
>;

export type Attachment = {
  name: string;
  url: string;
  contentType: string;
};

export type DBMessage = {
  _id: string;
  chatId: string;
  role: "user" | "assistant" | "system";
};
