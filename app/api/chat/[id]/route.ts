import { connectDb } from "@/lib/db";
import { extractFromToken, throwApiError } from "@/lib/utils";
import { Chat } from "@/models/chat.model";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await connectDb();
    const userId = extractFromToken(req);
    if (userId instanceof NextResponse) return userId;

    const chatId = (await params).id;
    const { title } = await req.json();

    const chat = await Chat.findOneAndUpdate(
      { chatId, userId },
      { title },
      { new: true }
    );
    return NextResponse.json(
      {
        message: "Chat updated successfully",
        success: true,
        chat,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return throwApiError(error.message || "Internal Server Error", 500);
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await connectDb();
    const userId = extractFromToken(req);
    if (userId instanceof NextResponse) return userId;
    const chatId = (await params).id;
    await Chat.findOneAndDelete({ _id: chatId, userId });

    return NextResponse.json(
      {
        message: "Chat deleted successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return throwApiError(error.message || "Internal Server Error", 500);
  }
};
