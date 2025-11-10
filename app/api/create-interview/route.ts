import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebase/admin";
import { getCurrentUser } from "@/lib/actions/auth.action";

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { role, type, techStack, difficulty, duration, description } = body;

    // Validate required fields
    if (!role || !type || !techStack) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create interview document
    const interviewRef = db.collection("interviews").doc();

    const interview = {
      userId: user.id,
      userName: user.name,
      role: role,
      type: type,
      techstack: Array.isArray(techStack) ? techStack : [techStack],
      difficulty: difficulty || "Medium",
      duration: parseInt(duration) || 30,
      description: description || "",
      finalized: true,
      createdAt: new Date().toISOString(),
    };

    await interviewRef.set(interview);

    return NextResponse.json({
      success: true,
      interviewId: interviewRef.id,
    });
  } catch (error: any) {
    console.error("Error creating interview:", error);
    return NextResponse.json(
      { error: "Failed to create interview", details: error?.message },
      { status: 500 }
    );
  }
}
