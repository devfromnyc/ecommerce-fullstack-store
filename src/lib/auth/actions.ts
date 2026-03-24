"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { signUpSchema, signInSchema } from "./validation";
import {
  getGuestSession,
  createGuestSession as createGuestSessionHelper,
  deleteGuestSession,
} from "./guest-session";
import type { SignUpInput, SignInInput } from "./validation";

interface ActionResult {
  success: boolean;
  error?: string;
  redirectTo?: string;
}

export async function signUp(input: SignUpInput): Promise<ActionResult> {
  const parsed = signUpSchema.safeParse(input);

  if (!parsed.success) {
    const firstError = parsed.error.errors[0];
    return { success: false, error: firstError?.message ?? "Invalid input" };
  }

  const { name, email, password } = parsed.data;
  const guestToken = await getGuestSession();

  try {
    const response = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
      headers: await headers(),
    });

    if (!response) {
      return { success: false, error: "Sign up failed. Please try again." };
    }

    if (guestToken) {
      await mergeGuestCartWithUserCart(guestToken);
      await deleteGuestSession(guestToken);
    }

    return { success: true, redirectTo: "/" };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return { success: false, error: message };
  }
}

export async function signIn(input: SignInInput): Promise<ActionResult> {
  const parsed = signInSchema.safeParse(input);

  if (!parsed.success) {
    const firstError = parsed.error.errors[0];
    return { success: false, error: firstError?.message ?? "Invalid input" };
  }

  const { email, password } = parsed.data;
  const guestToken = await getGuestSession();

  try {
    const response = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      headers: await headers(),
    });

    if (!response) {
      return { success: false, error: "Invalid email or password." };
    }

    if (guestToken) {
      await mergeGuestCartWithUserCart(guestToken);
      await deleteGuestSession(guestToken);
    }

    return { success: true, redirectTo: "/" };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Invalid email or password.";
    return { success: false, error: message };
  }
}

export async function signOut(): Promise<ActionResult> {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });

    return { success: true, redirectTo: "/sign-in" };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Sign out failed.";
    return { success: false, error: message };
  }
}

export async function guestSession(): Promise<string | null> {
  return getGuestSession();
}

export async function createGuestSessionAction(): Promise<string> {
  const existingToken = await getGuestSession();
  if (existingToken) {
    return existingToken;
  }
  return createGuestSessionHelper();
}

/**
 * Merges guest cart data with the authenticated user's cart.
 * This is a placeholder that should be expanded when the cart system
 * is fully implemented with database-backed carts.
 *
 * Currently, the cart is managed client-side via Zustand/localStorage.
 * When a database-backed cart is implemented, this function will:
 * 1. Look up guest cart items by guestToken
 * 2. Transfer those items to the user's cart
 * 3. Remove the guest cart records
 */
export async function mergeGuestCartWithUserCart(
  guestToken: string
): Promise<void> {
  // Future implementation: merge guest cart items into user cart
  // For now, the client-side Zustand store handles cart persistence
  // and the cart data naturally transfers when the user logs in
  // since it's stored in localStorage (not tied to guest session).
  void guestToken;
}
