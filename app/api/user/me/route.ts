import { connectDb } from "@/lib/db";
import { extractFromToken, throwApiError } from "@/lib/utils";
import { User } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    await connectDb();
    const userId = extractFromToken(req);
    const user = await User.findById(userId)
      .select("_id email fullname onboarded")
      .select("-password");
    if (!user) return throwApiError("User not found", 404);

    const response = NextResponse.json(
      {
        message: "User fetched successfully",
        success: true,
        user,
      },
      { status: 200 }
    );

    response.cookies.set("onboarded", user.onboarded ? "true" : "false", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error) {
    return throwApiError("Internal Server Error", 500);
  }
};
