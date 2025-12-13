import { throwApiError } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const response = NextResponse.json(
      {
        message: "Logout successful",
        success: true,
      },
      { status: 200 }
    );
    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    response.cookies.set("onboarded", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    return response;
  } catch (error: any) {
    return throwApiError(error.message || "Internal Server Error", 500);
  }
};
