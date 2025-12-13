import { connectDb } from "@/lib/db";
import { throwApiError } from "@/lib/utils";
import { User } from "@/models";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import JWT from "jsonwebtoken";

export const POST = async (req: NextRequest) => {
  try {
    await connectDb();
    const { email, password } = await req.json();

    if (!email) return throwApiError("Email is required", 400);
    if (!password) return throwApiError("Password is required", 400);

    const user = await User.findOne({ email });
    if (!user) return throwApiError("Invalid credentials", 400);

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) return throwApiError("Invalid credentials", 400);

    const tokenData = {
      id: user._id,
      email: user.email,
    };

    const token = JWT.sign(tokenData, process.env.JWT_SECRET_KEY as string, {
      expiresIn: "1h",
    });

    const response = NextResponse.json(
      {
        message: "User logged in successfully",
        success: true,
        user,
        token,
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error: any) {
    return throwApiError(error.message || "Internal Server Error", 500);
  }
};
