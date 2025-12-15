import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { UIMessage, UIMessagePart } from "ai";
import { ChatMessage, ChatTools, CustomUIDataTypes } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const throwApiError = (
  message: string = "Something went wrong",
  status: number = 500
) => {
  return NextResponse.json(
    {
      message,
      success: false,
    },
    { status: status }
  );
};

export const extractFromToken = (req: NextRequest) => {
  try {
    let token = req.cookies.get("token")?.value || "";

    if (!token) {
      const authHeader = req.headers.get("authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7);
      }
    }

    if (!token) throw new Error("No token provided");

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY!);

    if (!decodedToken || typeof decodedToken === "string")
      throw new Error("Invalid token");

    return decodedToken.id;
  } catch (error: any) {
    return throwApiError(error.message || "Invalid token", 401);
  }
};

export function sanitizeText(text: string) {
  return text.replace("<has_function_call>", "");
}

export function convertToUIMessages(messages: any[]): ChatMessage[] {
  return messages.map((message) => ({
    id: message._id,
    role: message.role as "user" | "assistant" | "system",
    parts: message.parts as UIMessagePart<CustomUIDataTypes, ChatTools>[],
    metadata: {
      createdAt: new Date(message.createdAt)
        .toISOString()
        .replace("T", " ")
        .substring(0, 19),
    },
  }));
}

export function getTextFromMessage(message: ChatMessage | UIMessage): string {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => (part as { type: "text"; text: string }).text)
    .join("");
}
