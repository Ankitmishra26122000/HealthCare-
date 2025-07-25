import { type NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { generateToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    console.log("🧠 REGISTER BODY:", body)

    const { email, password, role, firstName, lastName, ...otherData } = body

    if (!email || !password || !role || !firstName || !lastName) {
      console.log("❌ Missing field(s)!")
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // ... rest of your code ...

    //  Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    //  Create and save new user
    const user = new User({
      email,
      password,
      role,
      firstName,
      lastName,
      ...otherData,
    });

    await user.save();

    // Generate JWT token
    const token = generateToken(user);

    // Remove password before sending response
    const userResponse = user.toObject();
    delete userResponse.password;

    // Create response and set HTTP-only cookie
    const response = NextResponse.json(
      {
        message: "User registered successfully",
        user: userResponse,
        token,
      },
      { status: 201 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days (in seconds)
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
