import { extractFromToken, throwApiError } from "@/lib/utils";
import { User } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const userId = extractFromToken(req);
    const user = await User.findById(userId).select(
      "_id email fullname onboarded -password"
    );
    if (!user) return throwApiError("User not found", 404);

    return NextResponse.json(
      {
        message: "User fetched successfully",
        success: true,
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    return throwApiError("Internal Server Error", 500);
  }
};
