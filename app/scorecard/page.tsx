"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

interface Scorecard {
  summary: string;
  jobRole: string;
  experienceLevel: string;
  techStack: string;
  interviewType: string;
  completenessScore: number;
  recommendations: string[];
}

export default function ScorecardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [scorecard, setScorecard] = useState<Scorecard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get scorecard data from sessionStorage
    const storedScorecard = sessionStorage.getItem("scorecard");

    if (storedScorecard) {
      try {
        const data = JSON.parse(storedScorecard);
        setScorecard(data);
      } catch (error) {
        console.error("Error parsing scorecard:", error);
      }
    }

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your scorecard...</p>
        </div>
      </div>
    );
  }

  if (!scorecard) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center max-w-md mx-auto p-8">
          <Image
            src="/logo1.png"
            alt="Logo"
            width={80}
            height={80}
            className="mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            No Scorecard Found
          </h1>
          <p className="text-gray-600 mb-6">
            Please complete an interview preparation session first.
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Image
                src="/logo1.png"
                alt="Logo"
                width={60}
                height={60}
                className="object-cover"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Interview Preparation Scorecard
                </h1>
                <p className="text-gray-600">
                  Your personalized assessment and recommendations
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-indigo-600">
                {scorecard.completenessScore}%
              </div>
              <p className="text-sm text-gray-600">Completeness</p>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-indigo-50 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              📋 Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{scorecard.summary}</p>
          </div>
        </div>

        {/* Collected Information */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            📊 Collected Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">💼</span>
                <h3 className="font-semibold text-gray-800">Job Role</h3>
              </div>
              <p className="text-gray-700 ml-8">
                {scorecard.jobRole || "Not specified"}
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">📈</span>
                <h3 className="font-semibold text-gray-800">
                  Experience Level
                </h3>
              </div>
              <p className="text-gray-700 ml-8">
                {scorecard.experienceLevel || "Not specified"}
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🛠️</span>
                <h3 className="font-semibold text-gray-800">Tech Stack</h3>
              </div>
              <p className="text-gray-700 ml-8">
                {scorecard.techStack || "Not specified"}
              </p>
            </div>

            <div className="bg-orange-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🎯</span>
                <h3 className="font-semibold text-gray-800">Interview Type</h3>
              </div>
              <p className="text-gray-700 ml-8">
                {scorecard.interviewType || "Not specified"}
              </p>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            💡 Recommendations
          </h2>
          <div className="space-y-4">
            {scorecard.recommendations &&
            scorecard.recommendations.length > 0 ? (
              scorecard.recommendations.map((recommendation, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed flex-1">
                    {recommendation}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No recommendations available.</p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => router.push("/")}
            className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition font-semibold"
          >
            Go Home
          </button>
          <button
            onClick={() => window.print()}
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition font-semibold"
          >
            Print Scorecard
          </button>
        </div>
      </div>
    </div>
  );
}
