/**
 * Script to restore Firestore data from a backup JSON file
 *
 * This script will:
 * 1. Read a backup JSON file
 * 2. Restore all collections to Firestore
 * 3. Optionally merge with existing data or overwrite
 *
 * Usage:
 * npx tsx scripts/restore-firestore.ts <backup-file-path>
 *
 * Example:
 * npx tsx scripts/restore-firestore.ts backups/firestore-backup-2025-11-09.json
 *
 * WARNING: This will overwrite existing data! Use with caution!
 */

import { db } from "@/firebase/admin";
import fs from "fs";
import path from "path";

async function restoreFirestore(backupFilePath: string) {
  console.log("🔄 Starting Firestore restore...\n");

  try {
    // Check if backup file exists
    if (!fs.existsSync(backupFilePath)) {
      console.error(`❌ Backup file not found: ${backupFilePath}`);
      process.exit(1);
    }

    // Read backup file
    console.log(`📖 Reading backup file: ${backupFilePath}\n`);
    const backupContent = fs.readFileSync(backupFilePath, "utf-8");
    const backupData = JSON.parse(backupContent);

    // Validate backup structure
    if (!backupData.data || !backupData.metadata) {
      console.error("❌ Invalid backup file format");
      process.exit(1);
    }

    console.log("📊 Backup Information:");
    console.log(`   Timestamp: ${backupData.metadata.timestamp}`);
    console.log(`   Collections: ${backupData.metadata.totalCollections}`);
    console.log(`   Documents: ${backupData.metadata.totalDocuments}\n`);

    // Confirm restore
    console.log("⚠️  WARNING: This will overwrite existing data!");
    console.log(
      "   Press Ctrl+C to cancel, or wait 5 seconds to continue...\n"
    );
    await new Promise((resolve) => setTimeout(resolve, 5000));

    let totalRestored = 0;
    let totalErrors = 0;

    // Restore each collection
    for (const [collectionName, documents] of Object.entries(
      backupData.data as Record<string, any[]>
    )) {
      console.log(`📦 Restoring collection: ${collectionName}...`);

      if (!Array.isArray(documents)) {
        console.log(`   ⚠️  Skipping - invalid data format\n`);
        continue;
      }

      let restoredCount = 0;
      let errorCount = 0;

      for (const doc of documents) {
        try {
          const { id, ...data } = doc;

          if (!id) {
            console.log(`   ⚠️  Skipping document without ID`);
            errorCount++;
            continue;
          }

          await db.collection(collectionName).doc(id).set(data);
          restoredCount++;
        } catch (error) {
          console.error(`   ❌ Error restoring document:`, error);
          errorCount++;
        }
      }

      totalRestored += restoredCount;
      totalErrors += errorCount;

      console.log(
        `   ✅ Restored ${restoredCount} documents (${errorCount} errors)\n`
      );
    }

    console.log("=".repeat(50));
    console.log("📊 Restore Summary:");
    console.log("=".repeat(50));
    console.log(`✅ Total Restored: ${totalRestored}`);
    console.log(`❌ Total Errors: ${totalErrors}`);
    console.log("=".repeat(50) + "\n");

    console.log("✅ Restore completed successfully!");
  } catch (error) {
    console.error("❌ Fatal error during restore:", error);
    process.exit(1);
  }
}

// Get backup file path from command line arguments
const backupFilePath = process.argv[2];

if (!backupFilePath) {
  console.error("❌ Error: Please provide a backup file path");
  console.log("\nUsage:");
  console.log("  npx tsx scripts/restore-firestore.ts <backup-file-path>");
  console.log("\nExample:");
  console.log(
    "  npx tsx scripts/restore-firestore.ts backups/firestore-backup-2025-11-09.json"
  );
  process.exit(1);
}

// Run the script
restoreFirestore(backupFilePath)
  .then(() => {
    console.log("\n✨ Restore script completed!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Restore script failed:", error);
    process.exit(1);
  });
