import { generateToken } from "@/lib/jwt";
import { connectDB } from "@/lib/mongodb";
import userModel from "@/models/user.model";
import { APIResponse } from "@/types/api.types";
import { RegisterBody } from "@/types/user.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body: RegisterBody = await req.json();

    const { name, email, password, mobile } = body;

    if (!name || !email || !password) {
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

    const isExisted = await userModel.findOne({ email });

    if (isExisted) {
      return NextResponse.json<APIResponse>(
        {
          success: false,
          message: "User already existed",
        },
        {
          status: 409,
        },
      );
    }

    const user = await userModel.create({
      name,
      email,
      password,
      mobile,
    });

    const token = generateToken({ userId: user._id.toString() });

    const response = NextResponse.json<APIResponse>(
      {
        success: true,
        message: "User registered successfully",
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
