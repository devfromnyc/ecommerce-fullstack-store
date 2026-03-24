import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { guest } from "@/lib/db/schema/guest";
import { eq } from "drizzle-orm";

const GUEST_COOKIE_NAME = "guest_session";
const GUEST_SESSION_MAX_AGE_SECONDS = 7 * 24 * 60 * 60; // 7 days

function generateSessionToken(): string {
  return crypto.randomUUID();
}

export async function getGuestSession(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(GUEST_COOKIE_NAME)?.value ?? null;
}

export async function createGuestSession(): Promise<string> {
  const sessionToken = generateSessionToken();
  const expiresAt = new Date(
    Date.now() + GUEST_SESSION_MAX_AGE_SECONDS * 1000
  );

  await db.insert(guest).values({
    sessionToken,
    expiresAt,
  });

  const cookieStore = await cookies();
  cookieStore.set(GUEST_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: GUEST_SESSION_MAX_AGE_SECONDS,
  });

  return sessionToken;
}

export async function deleteGuestSession(
  sessionToken: string
): Promise<void> {
  await db.delete(guest).where(eq(guest.sessionToken, sessionToken));

  const cookieStore = await cookies();
  cookieStore.delete(GUEST_COOKIE_NAME);
}
