/**
 * Script to regenerate feedback for interviews that are missing it
 *
 * This script will:
 * 1. Find all interviews that don't have associated feedback
 * 2. Regenerate feedback using the interview transcript
 * 3. Save the new feedback to Firestore
 *
 * Usage:
 * npx tsx scripts/regenerate-feedback.ts
 */

import { db } from "@/firebase/admin";
import { createFeedback } from "@/lib/actions/general.action";

async function regenerateFeedback() {
  console.log("🔍 Starting feedback regeneration...\n");

  try {
    // Get all finalized interviews
    const interviewsSnapshot = await db
      .collection("interviews")
      .where("finalized", "==", true)
      .get();

    console.log(`📊 Found ${interviewsSnapshot.size} finalized interviews\n`);

    let regeneratedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    for (const interviewDoc of interviewsSnapshot.docs) {
      const interview = interviewDoc.data();
      const interviewId = interviewDoc.id;

      // Check if feedback already exists
      const feedbackSnapshot = await db
        .collection("feedback")
        .where("interviewId", "==", interviewId)
        .limit(1)
        .get();

      if (!feedbackSnapshot.empty) {
        console.log(`⏭️  Skipping interview ${interviewId} - feedback exists`);
        skippedCount++;
        continue;
      }

      // Check if interview has transcript
      if (!interview.transcript || interview.transcript.length === 0) {
        console.log(
          `⚠️  Skipping interview ${interviewId} - no transcript available`
        );
        skippedCount++;
        continue;
      }

      // Regenerate feedback
      console.log(`🔄 Regenerating feedback for interview ${interviewId}...`);

      try {
        const result = await createFeedback({
          interviewId: interviewId,
          userId: interview.userId,
          transcript: interview.transcript,
          feedbackId: undefined,
        });

        if (result.success) {
          console.log(
            `✅ Successfully created feedback ${result.feedbackId}\n`
          );
          regeneratedCount++;
        } else {
          console.log(`❌ Failed to create feedback for ${interviewId}\n`);
          errorCount++;
        }
      } catch (error) {
        console.error(
          `❌ Error creating feedback for ${interviewId}:`,
          error,
          "\n"
        );
        errorCount++;
      }

      // Add a small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    console.log("\n" + "=".repeat(50));
    console.log("📈 Feedback Regeneration Summary:");
    console.log("=".repeat(50));
    console.log(`✅ Regenerated: ${regeneratedCount}`);
    console.log(`⏭️  Skipped: ${skippedCount}`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📊 Total: ${interviewsSnapshot.size}`);
    console.log("=".repeat(50) + "\n");

    console.log("✨ Feedback regeneration completed!");
  } catch (error) {
    console.error("❌ Fatal error during feedback regeneration:", error);
    process.exit(1);
  }
}

// Run the script
regenerateFeedback()
  .then(() => {
    console.log("\n✅ Script completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Script failed:", error);
    process.exit(1);
  });
