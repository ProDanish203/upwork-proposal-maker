import { connectDb } from "@/lib/db";
import { extractFromToken, throwApiError } from "@/lib/utils";
import { Chat } from "@/models/chat.model";
import { Message } from "@/models/message.model";
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

    const chat = await Chat.findByIdAndUpdate(
      { _id: chatId },
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

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await connectDb();
    const userId = extractFromToken(req);
    if (userId instanceof NextResponse) return userId;
    const chatId = (await params).id;
    const chat = await Chat.findOne({ _id: chatId, userId });

    const messages = await Message.find({ chatId: chatId }).sort({
      createdAt: 1,
    });

    return NextResponse.json(
      {
        message: "Chat fetched successfully",
        success: true,
        chat: {
          ...chat?.toObject(),
          messages,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    return throwApiError(error.message || "Internal Server Error", 500);
  }
};
