# Critical Project Files Documentation

# Part 2: Constants & Core Logic

---

## File 5: lib/vapi.sdk.ts

**Location:** `/lib/vapi.sdk.ts`
**Purpose:** VAPI SDK initialization

```typescript
import Vapi from "@vapi-ai/web";

// Initialize VAPI with fallback
const webToken =
  process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN ||
  "bfd319b5-1b35-4123-aea4-1e39dba71991";

console.log(
  "🔧 Initializing VAPI with token:",
  webToken.substring(0, 8) + "..."
);

export const vapi = new Vapi(webToken);
```

---

## File 6: lib/actions/auth.action.ts

**Location:** `/lib/actions/auth.action.ts`
**Purpose:** Authentication server actions

```typescript
"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

// Session duration (1 week)
const SESSION_DURATION = 60 * 60 * 24 * 7;

// Set session cookie
export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();

  // Create session cookie
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: SESSION_DURATION * 1000, // milliseconds
  });

  // Set cookie in the browser
  cookieStore.set("session", sessionCookie, {
    maxAge: SESSION_DURATION,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}

export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;

  try {
    // check if user exists in db
    const userRecord = await db.collection("users").doc(uid).get();
    if (userRecord.exists)
      return {
        success: false,
        message: "User already exists. Please sign in.",
      };

    // save user to db
    await db.collection("users").doc(uid).set({
      name,
      email,
    });

    return {
      success: true,
      message: "Account created successfully. Please sign in.",
    };
  } catch (error: any) {
    console.error("Error creating user:", error);

    if (error.code === "auth/email-already-exists") {
      return {
        success: false,
        message: "This email is already in use",
      };
    }

    return {
      success: false,
      message: "Failed to create account. Please try again.",
    };
  }
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const decodedToken = await auth.verifyIdToken(idToken);

    const userRecord = await db.collection("users").doc(decodedToken.uid).get();
    if (!userRecord.exists) {
      return {
        success: false,
        message: "User account not found. Please sign up first.",
      };
    }

    await setSessionCookie(idToken);

    return {
      success: true,
      message: "Signed in successfully.",
    };
  } catch (error: any) {
    console.error("Error signing in:", error);

    if (
      error.code === "auth/user-not-found" ||
      error.code === "auth/invalid-credential"
    ) {
      return {
        success: false,
        message: "Invalid email or password. Please try again.",
      };
    }

    return {
      success: false,
      message: "Failed to log into account. Please try again.",
    };
  }
}

export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) return null;

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    const userRecord = await db
      .collection("users")
      .doc(decodedClaims.uid)
      .get();

    if (!userRecord.exists) {
      return null;
    }

    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;
  } catch (error) {
    cookieStore.delete("session");
    return null;
  }
}

export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}
```

---
