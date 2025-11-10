import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();

    // Clear session cookie
    cookieStore.delete("session");

    console.log("Debug: Authentication cleared");

    return Response.json({
      success: true,
      message: "Authentication cleared successfully",
    });
  } catch (error) {
    console.error("Error clearing auth:", error);
    return Response.json(
      {
        success: false,
        error: "Failed to clear authentication",
      },
      { status: 500 }
    );
  }
}
