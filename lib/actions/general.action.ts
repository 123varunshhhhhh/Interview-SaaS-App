"use server";

import { generateObject } from "ai";
import { google } from "@ai-sdk/google";

import { db } from "@/firebase/admin";
import { feedbackSchema } from "@/constants";

export async function createFeedback(params: CreateFeedbackParams) {
  const { interviewId, userId, transcript, feedbackId } = params;

  try {
    const formattedTranscript = transcript
      .map(
        (sentence: { role: string; content: string }) =>
          `- ${sentence.role}: ${sentence.content}\n`
      )
      .join("");

    const { object } = await generateObject({
      model: google("gemini-2.0-flash-001", {
        structuredOutputs: false,
      }),
      schema: feedbackSchema,
      prompt: `
        You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
        Transcript:
        ${formattedTranscript}

        Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
        - **Communication Skills**: Clarity, articulation, structured responses.
        - **Technical Knowledge**: Understanding of key concepts for the role.
        - **Problem-Solving**: Ability to analyze problems and propose solutions.
        - **Cultural & Role Fit**: Alignment with company values and job role.
        - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
        `,
      system:
        "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
    });

    const feedback = {
      interviewId: interviewId,
      userId: userId,
      totalScore: object.totalScore,
      categoryScores: object.categoryScores,
      strengths: object.strengths,
      areasForImprovement: object.areasForImprovement,
      finalAssessment: object.finalAssessment,
      createdAt: new Date().toISOString(),
    };

    let feedbackRef;

    if (feedbackId) {
      feedbackRef = db.collection("feedback").doc(feedbackId);
    } else {
      feedbackRef = db.collection("feedback").doc();
    }

    await feedbackRef.set(feedback);

    return { success: true, feedbackId: feedbackRef.id };
  } catch (error) {
    console.error("Error saving feedback:", error);
    return { success: false };
  }
}

export async function getInterviewById(id: string): Promise<Interview | null> {
  const interview = await db.collection("interviews").doc(id).get();

  return interview.data() as Interview | null;
}

export async function getFeedbackByInterviewId(
  params: GetFeedbackByInterviewIdParams
): Promise<Feedback | null> {
  const { interviewId, userId } = params;

  const querySnapshot = await db
    .collection("feedback")
    .where("interviewId", "==", interviewId)
    .where("userId", "==", userId)
    .limit(1)
    .get();

  if (querySnapshot.empty) return null;

  const feedbackDoc = querySnapshot.docs[0];
  return { id: feedbackDoc.id, ...feedbackDoc.data() } as Feedback;
}

export async function getLatestInterviews(
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> {
  const { userId, limit = 20 } = params;

  if (!userId) {
    return null;
  }

  try {
    // Fetch finalized interviews (no orderBy to avoid index requirement)
    // We'll filter and sort in memory
    const interviews = await db
      .collection("interviews")
      .where("finalized", "==", true)
      .limit(100) // Fetch a reasonable batch to filter from
      .get();

    // Filter out current user's interviews, sort by createdAt, and limit results
    const filteredAndSorted = interviews.docs
      .filter((doc) => doc.data().userId !== userId)
      .sort((a, b) => {
        const aTime = new Date(a.data().createdAt || 0).getTime();
        const bTime = new Date(b.data().createdAt || 0).getTime();
        return bTime - aTime; // Descending order (newest first)
      })
      .slice(0, limit)
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Interview[];

    return filteredAndSorted;
  } catch (error: any) {
    console.error("Error fetching latest interviews:", error);
    return [];
  }
}

export async function getInterviewsByUserId(
  userId: string | undefined
): Promise<Interview[] | null> {
  if (!userId) {
    return null;
  }

  const interviews = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}

export async function createInterviewPreparation(params: {
  userId: string;
  userName: string;
  transcript: Array<{ role: string; content: string }>;
  scorecard: {
    summary: string;
    jobRole: string;
    experienceLevel: string;
    techStack: string;
    interviewType: string;
    completenessScore: number;
    recommendations: string[];
  };
}) {
  const { userId, userName, transcript, scorecard } = params;

  try {
    const interviewRef = db.collection("interviews").doc();

    // Parse tech stack string into array
    const techStackArray = scorecard.techStack
      ? scorecard.techStack
          .split(/[,;]/)
          .map((tech) => tech.trim())
          .filter(Boolean)
      : [];

    const interview = {
      userId: userId,
      userName: userName,
      type: "preparation",
      jobRole: scorecard.jobRole || "Not specified",
      experienceLevel: scorecard.experienceLevel || "Not specified",
      techStack: techStackArray,
      interviewType: scorecard.interviewType || "Not specified",
      completenessScore: scorecard.completenessScore || 0,
      transcript: transcript,
      finalized: true,
      createdAt: new Date().toISOString(),
    };

    await interviewRef.set(interview);

    // Also save the scorecard as feedback
    const feedbackRef = db.collection("feedback").doc();
    const feedback = {
      interviewId: interviewRef.id,
      userId: userId,
      totalScore: scorecard.completenessScore || 0,
      categoryScores: {
        "Information Completeness": scorecard.completenessScore || 0,
      },
      strengths: scorecard.recommendations || [],
      areasForImprovement: [],
      finalAssessment: scorecard.summary || "Interview preparation completed",
      createdAt: new Date().toISOString(),
    };

    await feedbackRef.set(feedback);

    return {
      success: true,
      interviewId: interviewRef.id,
      feedbackId: feedbackRef.id,
    };
  } catch (error) {
    console.error("Error saving interview preparation:", error);
    return { success: false };
  }
}
