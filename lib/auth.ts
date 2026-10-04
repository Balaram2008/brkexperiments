import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: "USER" | "ADMIN";
  avatar?: string | null;
}

const AUTH_COOKIE = "brk_session";

export function createToken(user: SessionUser): string {
  const payload = {
    ...user,
    exp: Date.now() + 30 * 24 * 60 * 60 * 1000,
  };
  return Buffer.from(JSON.stringify(payload)).toString("base64");
}

export function verifyToken(token: string): SessionUser | null {
  try {
    const json = Buffer.from(token, "base64").toString("utf-8");
    const payload = JSON.parse(json);
    if (payload.exp && Date.now() > payload.exp) return null;
    return {
      id: payload.id,
      email: payload.email,
      name: payload.name,
      role: payload.role,
      avatar: payload.avatar,
    };
  } catch {
    return null;
  }
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(AUTH_COOKIE)?.value;
    if (!token) return null;
    return verifyToken(token);
  } catch {
    return null;
  }
}
