import { generateToken } from "@/lib/jwt";
import { connectDB } from "@/lib/mongodb";
import userModel from "@/models/user.model";
import { APIResponse } from "@/types/api.types";
import { LoginBody } from "@/types/user.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body: LoginBody = await req.json();

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json<APIResponse>(
        {
          success: false,
          message: "All fields are required",
        },
        {
          status: 400,
        },
      );
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return NextResponse.json<APIResponse>(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        },
      );
    }

    const matchPass = user.comparePass(password);

    if (!matchPass) {
      return NextResponse.json<APIResponse>(
        {
          success: false,
          message: "Invalid Credentials",
        },
        {
          status: 401,
        },
      );
    }

    const token = generateToken({ userId: user._id.toString() });

    const response = NextResponse.json<APIResponse>(
      {
        success: true,
        message: "User login successfully",
        data: {
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
          },
        },
      },
      { status: 201 },
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });

    return response;
  } catch (error) {
    console.log("error in register api", error);
    return NextResponse.json<APIResponse>(
      {
        success: false,
        message: "something went wrong",
        error: {
          error,
        },
      },
      { status: 500 },
    );
  }
}
