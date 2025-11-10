// pages/api/generate-scorecard.ts
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: NextRequest) {
  try {
    const { transcript } = await request.json();

    console.log("📝 Received transcript:", transcript);
    console.log("📝 Transcript type:", typeof transcript);
    console.log("📝 Transcript length:", transcript?.length);

    if (!transcript || transcript.trim().length === 0) {
      console.error("❌ Empty or missing transcript");
      return NextResponse.json(
        { error: "Transcript is required and cannot be empty" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      console.error("Google API key not configured");
      return NextResponse.json(
        { error: "Google API key not configured" },
        { status: 500 }
      );
    }

    // ✅ Correct new SDK
    const genAI = new GoogleGenerativeAI(apiKey);

    // Use latest Gemini model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-pro",
    });

    const prompt = `
      Analyze this interview preparation conversation and generate a detailed scorecard.

      Conversation Transcript:
      ${transcript}

      Provide JSON:
      {
        summary: "",
        jobRole: "",
        experienceLevel: "",
        techStack: "",
        interviewType: "",
        completenessScore: 0-100,
        recommendations: []
      }
    `;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    let scorecard;

    try {
      const cleanText = text.replace(/```json|```/g, "");
      scorecard = JSON.parse(cleanText);
    } catch {
      scorecard = {
        summary: text,
        completenessScore: 0,
        recommendations: ["Failed to parse JSON output"],
      };
    }

    return NextResponse.json({ scorecard });
  } catch (error: any) {
    console.error("❌ Error generating scorecard:", error);
    console.error("❌ Error message:", error?.message);
    console.error("❌ Error stack:", error?.stack);
    return NextResponse.json(
      {
        error: "Failed to generate scorecard",
        details: error?.message || "Unknown error",
        errorType: error?.constructor?.name || typeof error,
      },
      { status: 500 }
    );
  }
}
