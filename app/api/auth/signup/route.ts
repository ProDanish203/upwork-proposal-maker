import { connectDb } from "@/lib/db";
import { throwApiError } from "@/lib/utils";
import { User } from "@/models";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import JWT from "jsonwebtoken";

export const POST = async (req: NextRequest) => {
  try {
    await connectDb();
    const { email, password, fullname } = await req.json();

    if (!email) return throwApiError("Email is required", 400);
    if (!password) return throwApiError("Password is required", 400);
    if (!fullname) return throwApiError("Fullname is required", 400);

    const userExists = await User.findOne({ email });
    if (userExists)
      return throwApiError("User with this email already exists", 400);

    const salt = await bcryptjs.genSalt(10);
    const hashedPass = await bcryptjs.hash(password, salt);

    const newUser = await User.create({
      email,
      password: hashedPass,
      fullname,
    });
    if (!newUser) return throwApiError("Failed to create user", 500);

    const tokenData = {
      id: newUser._id,
      email: newUser.email,
    };

    const token = JWT.sign(tokenData, process.env.JWT_SECRET_KEY as string, {
      expiresIn: "1h",
    });

    const newUserObj = newUser.toObject();

    const response = NextResponse.json(
      {
        message: "User created successfully",
        success: true,
        user: {
          _id: newUserObj._id,
          email: newUserObj.email,
          fullname: newUserObj.fullname,
          avatar: newUserObj.avatar,
          onboarded: newUserObj.onboarded,
        },
        token,
      },
      { status: 201 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    response.cookies.set("onboarded", newUser.onboarded ? "true" : "false", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error: any) {
    return throwApiError(error.message || "Internal Server Error", 500);
  }
};
