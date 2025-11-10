"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import React from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import { createFeedback } from "@/lib/actions/general.action";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

const Agent = ({
  userName,
  userId,
  interviewId,
  feedbackId,
  type,
  questions,
  templateId,
}: AgentProps) => {
  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastMessage, setLastMessage] = useState<string>("");
  const errorMessageRef = React.useRef<string | null>(null);

  useEffect(() => {
    const onCallStart = () => {
      console.log("🟢 Call started successfully!");
      console.log("⏰ Call start time:", new Date().toISOString());
      setCallStatus(CallStatus.ACTIVE);
    };

    const onCallEnd = () => {
      console.log("🔴 Call ended - checking why...");
      console.log("📊 Messages collected:", messages.length);
      console.log("📊 Call duration:", Date.now());
      setCallStatus(CallStatus.FINISHED);
    };

    const onMessage = (message: Message) => {
      console.log("📨 Message received:", message.type, message);

      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        console.log("💬 Transcript:", message.role, "-", message.transcript);
        setMessages((prev) => [...prev, newMessage]);
      }

      // Log if assistant says it's ending the conversation
      if (message.type === "transcript" && message.role === "assistant") {
        const content = message.transcript?.toLowerCase() || "";
        if (
          content.includes("thank you") ||
          content.includes("goodbye") ||
          content.includes("end")
        ) {
          console.log(
            "⚠️ Assistant might be ending conversation:",
            message.transcript
          );
        }
      }
    };

    const onSpeechStart = () => {
      console.log("speech start");
      setIsSpeaking(true);
    };

    const onSpeechEnd = () => {
      console.log("speech end");
      setIsSpeaking(false);
    };

    const onError = (error: Error | unknown) => {
      // Enhanced error logging
      console.error("🚨 VAPI ERROR DETAILS:");
      console.error("Raw error:", error);
      console.error("Error type:", typeof error);
      console.error("Error constructor:", error?.constructor?.name);

      // Try to extract meaningful error info
      if (error && typeof error === "object") {
        const errorObj = error as any;
        console.error("Error object keys:", Object.keys(errorObj));
        console.error("Error message:", errorObj.message);
        console.error("Error status:", errorObj.status);
        console.error("Error code:", errorObj.code);
        console.error("Error response:", errorObj.response);

        // Check for HTTP response details
        if (errorObj.error && errorObj.error.status) {
          console.error("HTTP Status:", errorObj.error.status);
          console.error("HTTP Status Text:", errorObj.error.statusText);
        }
      }

      // Check if error is null/undefined
      if (error === null || error === undefined) {
        console.error("Vapi Error: Received null or undefined error");
        setCallStatus(CallStatus.INACTIVE);
        return;
      }

      // Handle Error instances
      if (error instanceof Error) {
        console.error("Vapi Error Details:", {
          message: error.message || "(no message)",
          stack: error.stack || "(no stack)",
          name: error.name || "(no name)",
          toString: error.toString(),
          error: error,
        });
      }
      // Handle plain objects (like vapi error objects)
      else if (typeof error === "object") {
        try {
          const errorObj = error as Record<string, unknown>;

          // Extract Response object if present and try to get its details
          let responseDetails = null;
          if (errorObj.error instanceof Response) {
            const response = errorObj.error as Response;
            responseDetails = {
              status: response.status,
              statusText: response.statusText,
              url: response.url,
              ok: response.ok,
              type: response.type,
              bodyUsed: response.bodyUsed,
            };

            // Always use stored error message if available (from catch handler)
            // Never try to read response body here as it's likely already consumed
            if (errorMessageRef.current) {
              console.error(
                "Vapi API Error (from stored message):",
                errorMessageRef.current
              );
              // Don't show alert here as catch handler already showed it
            } else {
              // If no stored message, just log the response details
              console.error("Vapi Error Response Details:", {
                status: response.status,
                statusText: response.statusText,
                url: response.url,
                bodyUsed: response.bodyUsed,
                note: "Response body was consumed by SDK or catch handler. Check catch handler logs for error message.",
              });
            }
          }

          console.error("Vapi Error Object:", {
            type: errorObj.type,
            stage: errorObj.stage,
            timestamp: errorObj.timestamp,
            totalDuration: errorObj.totalDuration,
            responseDetails: responseDetails,
            allKeys: Object.keys(errorObj),
            error: error,
            // Try to extract the actual error message
            errorMessage:
              (errorObj.error as any)?.msg ||
              (errorObj.error as any)?.message ||
              (errorObj as any).errorMsg,
            errorDetails: errorObj.error,
            context: errorObj.context,
          });

          // Show user-friendly error message
          if (errorObj.type === "start-method-error") {
            alert(
              "Failed to start the call. Please check your Vapi configuration and try again."
            );
          }
        } catch (e) {
          console.error("Vapi Error: Could not parse error object", e);
        }
      }
      // Handle primitives
      else {
        console.error("Vapi Error Primitive:", {
          value: error,
          type: typeof error,
          stringified: String(error),
        });
      }

      setCallStatus(CallStatus.INACTIVE);
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1].content);
    }

    const handleGenerateSummary = async (messages: SavedMessage[]) => {
      console.log("Generating summary and scorecard...");
      console.log("📊 Messages count:", messages.length);
      console.log("📊 Messages:", messages);

      // Check if we have any messages
      if (!messages || messages.length === 0) {
        console.error("❌ No messages to generate scorecard from");

        const basicScorecard = {
          summary: "Call ended without any conversation recorded.",
          jobRole: "Not collected",
          experienceLevel: "Not collected",
          techStack: "Not collected",
          interviewType: "Not collected",
          completenessScore: 0,
          recommendations: [
            "The call ended too quickly. Please try again and speak clearly.",
            "Ensure your microphone is working properly.",
            "Check your internet connection stability.",
          ],
        };

        sessionStorage.setItem("scorecard", JSON.stringify(basicScorecard));
        router.push("/scorecard");
        return;
      }

      // Extract the collected information from the conversation
      const transcript = messages
        .map((m) => `${m.role}: ${m.content}`)
        .join("\n");

      console.log("📝 Generated transcript:", transcript);

      try {
        // Call API to generate scorecard
        const response = await fetch("/api/generate-scorecard", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ transcript }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("❌ API Error:", errorData);
          throw new Error(errorData.error || "Failed to generate scorecard");
        }

        const data = await response.json();
        const { scorecard } = data;

        // Display scorecard
        console.log("=== SCORECARD ===", scorecard);

        // Save interview to database
        try {
          const { createInterviewPreparation } = await import(
            "@/lib/actions/general.action"
          );
          const result = await createInterviewPreparation({
            userId: userId!,
            userName: userName!,
            transcript: messages,
            scorecard: scorecard,
          });

          if (result.success) {
            console.log("Interview saved successfully:", result.interviewId);
          }
        } catch (error) {
          console.error("Error saving interview:", error);
        }

        // Store scorecard in sessionStorage and redirect to scorecard page
        sessionStorage.setItem("scorecard", JSON.stringify(scorecard));
        router.push("/scorecard");
      } catch (error) {
        console.error("Error generating scorecard:", error);

        // Fallback: Create basic scorecard without AI analysis
        const basicScorecard = {
          summary:
            "Interview preparation session completed. AI analysis unavailable.",
          jobRole: "Not analyzed",
          experienceLevel: "Not analyzed",
          techStack: "Not analyzed",
          interviewType: "Not analyzed",
          completenessScore: 0,
          recommendations: [
            "Please try the session again for AI-powered recommendations.",
            "Review the conversation transcript for collected information.",
          ],
        };

        sessionStorage.setItem("scorecard", JSON.stringify(basicScorecard));
        router.push("/scorecard");
      }
    };

    const handleGenerateFeedback = async (messages: SavedMessage[]) => {
      console.log("handleGenerateFeedback");

      const { success, feedbackId: id } = await createFeedback({
        interviewId: interviewId!,
        userId: userId!,
        transcript: messages,
        feedbackId,
      });

      if (success && id) {
        router.push(`/interview/${interviewId}/feedback`);
      } else {
        console.log("Error saving feedback");
        router.push("/");
      }
    };

    if (callStatus === CallStatus.FINISHED) {
      if (type === "generate") {
        // Generate summary and scorecard for interview prep
        handleGenerateSummary(messages);
      } else {
        handleGenerateFeedback(messages);
      }
    }
  }, [messages, callStatus, feedbackId, interviewId, router, type, userId]);

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    if (type === "generate") {
      try {
        // Use assistant ID - proven to work with Web SDK
        const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;
        const webToken = "bfd319b5-1b35-4123-aea4-1e39dba71991";

        // Debug logging
        console.log("🔍 Debug Info:");
        console.log("Assistant ID:", assistantId);
        console.log(
          "Web Token:",
          webToken ? `${webToken.substring(0, 8)}...` : "NOT SET"
        );
        console.log("Type:", type);
        console.log("VAPI instance:", vapi);

        if (!assistantId) {
          console.error("NEXT_PUBLIC_VAPI_ASSISTANT_ID is not set!");
          alert(
            "Assistant ID not configured. Please check your environment variables."
          );
          setCallStatus(CallStatus.INACTIVE);
          return;
        }

        if (!webToken) {
          console.error("NEXT_PUBLIC_VAPI_WEB_TOKEN is not set!");
          alert(
            "Vapi Web Token not configured. Please check your environment variables."
          );
          setCallStatus(CallStatus.INACTIVE);
          return;
        }

        console.log("Starting assistant with ID:", assistantId);
        console.log("Web Token (first 8 chars):", webToken?.substring(0, 8));
        console.log("VAPI SDK instance:", vapi);

        // Test if VAPI is properly initialized
        if (!vapi) {
          console.error("VAPI SDK not initialized!");
          alert("VAPI SDK not initialized. Check your setup.");
          setCallStatus(CallStatus.INACTIVE);
          return;
        }

        // Clear any previous error messages
        errorMessageRef.current = null;

        // Use assistant ID - simple and works reliably
        await vapi.start(assistantId).catch(async (error) => {
          // Handle errors from vapi.start() directly
          console.error("Error from vapi.start() - Full error:", error);
          console.error("Error type:", typeof error);
          console.error("Error constructor:", error?.constructor?.name);

          let errorMessage =
            "Failed to start call. Please check your configuration.";

          // Try to extract error message from various formats
          // Priority: nested Response > direct Response > Error object > other
          try {
            // Check if error is an object with nested Response (most common case with vapi SDK)
            if (typeof error === "object" && error !== null) {
              const errorObj = error as Record<string, unknown>;
              console.error("Error object keys:", Object.keys(errorObj));

              // Check for nested Response FIRST (this is the actual API error)
              if (
                errorObj.error instanceof Response &&
                !errorObj.error.bodyUsed
              ) {
                try {
                  const text = await errorObj.error.clone().text();
                  console.error("Nested Vapi API Error Response Text:", text);
                  try {
                    const json = JSON.parse(text);
                    errorMessage =
                      json.message ||
                      json.error?.message ||
                      json.error ||
                      text ||
                      errorObj.error.statusText;
                    console.error("Nested Vapi API Error Response JSON:", json);
                  } catch {
                    errorMessage =
                      text || errorObj.error.statusText || "Unknown error";
                  }
                  errorMessageRef.current = errorMessage;
                  // Store immediately so error event handler can use it
                } catch (e) {
                  console.error("Could not read nested response body:", e);
                  errorMessage =
                    errorObj.error.statusText ||
                    "Could not read error response";
                  errorMessageRef.current = errorMessage;
                }
              }
              // Check if error is a direct Response object
              else if (error instanceof Response && !error.bodyUsed) {
                try {
                  const text = await error.clone().text();
                  console.error("Vapi API Error Response Text:", text);
                  try {
                    const json = JSON.parse(text);
                    errorMessage =
                      json.message ||
                      json.error?.message ||
                      json.error ||
                      text ||
                      error.statusText;
                    console.error("Vapi API Error Response JSON:", json);
                  } catch {
                    errorMessage = text || error.statusText || "Unknown error";
                  }
                  errorMessageRef.current = errorMessage;
                } catch (e) {
                  console.error("Could not read response body:", e);
                  errorMessage =
                    error.statusText || "Could not read error response";
                  errorMessageRef.current = errorMessage;
                }
              }
              // Check for error message in object
              else if (errorObj.message) {
                errorMessage = String(errorObj.message);
                errorMessageRef.current = errorMessage;
              }
              // Check for error string in object
              else if (errorObj.error && typeof errorObj.error === "string") {
                errorMessage = errorObj.error;
                errorMessageRef.current = errorMessage;
              }
            }
            // Check if error is a direct Response object (less common)
            else if (error instanceof Response) {
              if (!error.bodyUsed) {
                try {
                  const text = await error.clone().text();
                  console.error("Vapi API Error Response Text:", text);
                  try {
                    const json = JSON.parse(text);
                    errorMessage =
                      json.message ||
                      json.error?.message ||
                      json.error ||
                      text ||
                      error.statusText;
                    console.error("Vapi API Error Response JSON:", json);
                  } catch {
                    errorMessage = text || error.statusText || "Unknown error";
                  }
                  errorMessageRef.current = errorMessage;
                } catch (e) {
                  console.error("Could not read response body:", e);
                  errorMessage =
                    error.statusText || "Could not read error response";
                  errorMessageRef.current = errorMessage;
                }
              } else {
                errorMessage =
                  error.statusText || "Response body already consumed";
                errorMessageRef.current = errorMessage;
              }
            }
            // Check if error is an Error object
            else if (error instanceof Error) {
              errorMessage = error.message;
              errorMessageRef.current = errorMessage;
            }
          } catch (e) {
            console.error("Error extracting error message:", e);
            errorMessage =
              "Failed to extract error details. Check console for more information.";
            errorMessageRef.current = errorMessage;
          }

          console.error("Final error message:", errorMessage);
          alert(errorMessage);
          throw error; // Re-throw to be caught by outer catch
        });
      } catch (error) {
        // Log error details in a more readable format
        if (error instanceof Error) {
          console.error("Error starting workflow:", {
            message: error.message,
            stack: error.stack,
            name: error.name,
            error: error,
          });
        } else {
          console.error("Error starting workflow:", {
            error,
            type: typeof error,
            stringified: JSON.stringify(error, null, 2),
          });
        }
        alert("Failed to start call. Check console for details.");
        setCallStatus(CallStatus.INACTIVE);
      }
    } else {
      try {
        let formattedQuestions = "";
        if (questions) {
          formattedQuestions = questions
            .map((question) => `- ${question}`)
            .join("\n");
        }

        console.log("🔍 Starting interview with questions:");
        console.log("Type:", type);
        console.log("Template ID:", templateId);
        console.log("Questions count:", questions?.length || 0);
        console.log("Formatted questions:", formattedQuestions);

        // Use the main assistant for all interviews
        const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;

        if (!assistantId) {
          console.error("No VAPI assistant ID configured!");
          alert(
            "Assistant not configured. Please set NEXT_PUBLIC_VAPI_ASSISTANT_ID in your .env.local file."
          );
          setCallStatus(CallStatus.INACTIVE);
          return;
        }

        console.log("Using assistant ID:", assistantId);
        console.log(
          "Is Frontend Junior assistant:",
          templateId === "frontend-junior" &&
            assistantId ===
              process.env.NEXT_PUBLIC_VAPI_FRONTEND_JUNIOR_ASSISTANT_ID
        );

        // Clear any previous error messages
        errorMessageRef.current = null;

        console.log("Starting VAPI call with config:", {
          assistantId: assistantId,
          hasQuestions: !!formattedQuestions,
          questionCount: questions?.length || 0,
        });

        // Start the call with questions
        await vapi
          .start(assistantId, {
            variableValues: {
              questions: formattedQuestions,
            },
          })
          .catch(async (error) => {
            // Handle errors from vapi.start() for interview type
            console.error(
              "Error from vapi.start() (interview) - Full error:",
              error
            );
            console.error("Error type:", typeof error);
            console.error("Error constructor:", error?.constructor?.name);

            let errorMessage =
              "Failed to start interview. Please check your configuration.";

            // Try to extract error message from various formats
            try {
              if (typeof error === "object" && error !== null) {
                const errorObj = error as Record<string, unknown>;
                console.error("Error object keys:", Object.keys(errorObj));

                // Check for nested Response
                if (
                  errorObj.error instanceof Response &&
                  !errorObj.error.bodyUsed
                ) {
                  try {
                    const text = await errorObj.error.clone().text();
                    console.error("Nested Vapi API Error Response Text:", text);
                    try {
                      const json = JSON.parse(text);
                      errorMessage =
                        json.message ||
                        json.error?.message ||
                        json.error ||
                        text ||
                        errorObj.error.statusText;
                      console.error(
                        "Nested Vapi API Error Response JSON:",
                        json
                      );
                    } catch {
                      errorMessage =
                        text || errorObj.error.statusText || "Unknown error";
                    }
                    errorMessageRef.current = errorMessage;
                  } catch (e) {
                    console.error("Could not read nested response body:", e);
                    errorMessage =
                      errorObj.error.statusText ||
                      "Could not read error response";
                    errorMessageRef.current = errorMessage;
                  }
                }
                // Check if error is a direct Response object
                else if (error instanceof Response && !error.bodyUsed) {
                  try {
                    const text = await error.clone().text();
                    console.error("Vapi API Error Response Text:", text);
                    try {
                      const json = JSON.parse(text);
                      errorMessage =
                        json.message ||
                        json.error?.message ||
                        json.error ||
                        text ||
                        error.statusText;
                      console.error("Vapi API Error Response JSON:", json);
                    } catch {
                      errorMessage =
                        text || error.statusText || "Unknown error";
                    }
                    errorMessageRef.current = errorMessage;
                  } catch (e) {
                    console.error("Could not read response body:", e);
                    errorMessage =
                      error.statusText || "Could not read error response";
                    errorMessageRef.current = errorMessage;
                  }
                }
                // Check for error message in object
                else if (errorObj.message) {
                  errorMessage = String(errorObj.message);
                  errorMessageRef.current = errorMessage;
                }
                // Check for error string in object
                else if (errorObj.error && typeof errorObj.error === "string") {
                  errorMessage = errorObj.error;
                  errorMessageRef.current = errorMessage;
                }
              }
              // Check if error is a direct Response object
              else if (error instanceof Response) {
                if (!error.bodyUsed) {
                  try {
                    const text = await error.clone().text();
                    console.error("Vapi API Error Response Text:", text);
                    try {
                      const json = JSON.parse(text);
                      errorMessage =
                        json.message ||
                        json.error?.message ||
                        json.error ||
                        text ||
                        error.statusText;
                      console.error("Vapi API Error Response JSON:", json);
                    } catch {
                      errorMessage =
                        text || error.statusText || "Unknown error";
                    }
                    errorMessageRef.current = errorMessage;
                  } catch (e) {
                    console.error("Could not read response body:", e);
                    errorMessage =
                      error.statusText || "Response body already consumed";
                    errorMessageRef.current = errorMessage;
                  }
                } else {
                  errorMessage =
                    error.statusText || "Response body already consumed";
                  errorMessageRef.current = errorMessage;
                }
              }
              // Check if error is an Error object
              else if (error instanceof Error) {
                errorMessage = error.message;
                errorMessageRef.current = errorMessage;
              }
            } catch (e) {
              console.error("Error extracting error message:", e);
              errorMessage =
                "Failed to extract error details. Check console for more information.";
              errorMessageRef.current = errorMessage;
            }

            console.error("Final error message:", errorMessage);
            alert(errorMessage);
            throw error; // Re-throw to be caught by outer catch
          });
      } catch (error) {
        // Log error details
        if (error instanceof Error) {
          console.error("Error starting interview:", {
            message: error.message,
            stack: error.stack,
            name: error.name,
            error: error,
          });
        } else {
          console.error("Error starting interview:", {
            error,
            type: typeof error,
            stringified: JSON.stringify(error, null, 2),
          });
        }
        alert("Failed to start interview. Check console for details.");
        setCallStatus(CallStatus.INACTIVE);
      }
    }
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  return (
    <>
      <div className="call-view">
        {/* AI Interviewer Card */}
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src="/logo1.png"
              alt="profile-image"
              width={65}
              height={54}
              className="object-cover"
            />
            {isSpeaking && <span className="animate-speak" />}
          </div>
          <h3>AI Interviewer</h3>
        </div>

        {/* User Profile Card */}
        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="profile-image"
              width={539}
              height={539}
              className="rounded-full object-cover size-[120px]"
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      {messages.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              key={lastMessage}
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100"
              )}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center">
        {callStatus !== "ACTIVE" ? (
          <button className="relative btn-call" onClick={() => handleCall()}>
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== "CONNECTING" && "hidden"
              )}
            />

            <span className="relative">
              {callStatus === "INACTIVE" || callStatus === "FINISHED"
                ? "Call"
                : ". . ."}
            </span>
          </button>
        ) : (
          <button className="btn-disconnect" onClick={() => handleDisconnect()}>
            End
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;
