import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export interface TokenPayload {
  userId: string;
  email: string;
  role: "patient" | "doctor" | "admin";
  firstName: string;
  lastName: string;
}
/**
 * Verifies the JWT token from cookies or Authorization header
 */
export async function verifyToken(request: NextRequest): Promise<TokenPayload | null> {
  try {
    const cookieToken = request.cookies.get("token")?.value;
    const headerToken = request.headers.get("authorization")?.replace("Bearer ", "");
    const token = cookieToken || headerToken;

    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
    return decoded;
  } catch (error) {
    console.error("Token verification error:", error);
    return null;
  }
}

/**
 * Generates a JWT token using user data
 */
console.log("✅ JWT_SECRET from env:", process.env.JWT_SECRET)
export function generateToken(user: any): string {
  const payload: TokenPayload = {
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
}

/**
 * Client-side auth token utilities
 */
export const authUtils = {
  setToken: (token: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("authToken", token);
    }
  },

  getToken: () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("authToken");
    }
    return null;
  },

  removeToken: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
    }
  },

  isAuthenticated: () => {
    return !!authUtils.getToken();
  },
};
