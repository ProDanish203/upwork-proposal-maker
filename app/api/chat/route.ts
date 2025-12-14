import { connectDb } from "@/lib/db";
import { extractFromToken, throwApiError } from "@/lib/utils";
import { Chat } from "@/models/chat.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectDb();
    const userId = extractFromToken(req);
    if (userId instanceof NextResponse) return userId;

    const chat = await Chat.create({ userId, title: "New Chat" });
    return NextResponse.json(
      {
        message: "Chat created successfully",
        success: true,
        chat,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return throwApiError(error.message || "Internal Server Error", 500);
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const page = parseInt(searchParams.get("page") || "1", 10);
    await connectDb();
    const userId = extractFromToken(req);
    if (userId instanceof NextResponse) return userId;

    const chats = await Chat.find({ userId })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        message: "Chats fetched successfully",
        success: true,
        chats,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return throwApiError(error.message || "Internal Server Error", 500);
  }
};
