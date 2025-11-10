/**
 * Script to backup Firestore data to JSON files
 *
 * This script will:
 * 1. Export all collections to JSON files
 * 2. Save them in the backups/ directory
 * 3. Include timestamp in filename
 *
 * Usage:
 * npx tsx scripts/backup-firestore.ts
 *
 * Recommended: Run this weekly or before major changes
 */

import { db } from "@/firebase/admin";
import fs from "fs";
import path from "path";

const COLLECTIONS_TO_BACKUP = ["feedback", "interviews", "users"];

async function backupFirestore() {
  console.log("🔄 Starting Firestore backup...\n");

  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupDir = path.join(process.cwd(), "backups");
    const backupFile = path.join(
      backupDir,
      `firestore-backup-${timestamp}.json`
    );

    // Create backups directory if it doesn't exist
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
      console.log("📁 Created backups directory\n");
    }

    const backup: Record<string, any[]> = {};
    let totalDocuments = 0;

    // Backup each collection
    for (const collectionName of COLLECTIONS_TO_BACKUP) {
      console.log(`📦 Backing up collection: ${collectionName}...`);

      try {
        const snapshot = await db.collection(collectionName).get();
        const documents = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        backup[collectionName] = documents;
        totalDocuments += documents.length;

        console.log(`   ✅ Backed up ${documents.length} documents\n`);
      } catch (error) {
        console.error(`   ❌ Error backing up ${collectionName}:`, error, "\n");
        backup[collectionName] = [];
      }
    }

    // Add metadata
    const backupData = {
      metadata: {
        timestamp: new Date().toISOString(),
        totalCollections: COLLECTIONS_TO_BACKUP.length,
        totalDocuments: totalDocuments,
        collections: COLLECTIONS_TO_BACKUP,
      },
      data: backup,
    };

    // Write to file
    fs.writeFileSync(backupFile, JSON.stringify(backupData, null, 2));

    // Calculate file size
    const stats = fs.statSync(backupFile);
    const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);

    console.log("=".repeat(50));
    console.log("📊 Backup Summary:");
    console.log("=".repeat(50));
    console.log(`📁 File: ${backupFile}`);
    console.log(`📦 Collections: ${COLLECTIONS_TO_BACKUP.length}`);
    console.log(`📄 Total Documents: ${totalDocuments}`);
    console.log(`💾 File Size: ${fileSizeInMB} MB`);
    console.log("=".repeat(50) + "\n");

    console.log("✅ Backup completed successfully!");

    // Clean up old backups (keep last 10)
    cleanupOldBackups(backupDir);
  } catch (error) {
    console.error("❌ Fatal error during backup:", error);
    process.exit(1);
  }
}

function cleanupOldBackups(backupDir: string) {
  console.log("\n🧹 Cleaning up old backups...");

  try {
    const files = fs
      .readdirSync(backupDir)
      .filter((file) => file.startsWith("firestore-backup-"))
      .sort()
      .reverse();

    if (files.length > 10) {
      const filesToDelete = files.slice(10);
      console.log(`   Deleting ${filesToDelete.length} old backup(s)...`);

      for (const file of filesToDelete) {
        fs.unlinkSync(path.join(backupDir, file));
        console.log(`   ✅ Deleted: ${file}`);
      }
    } else {
      console.log("   No old backups to delete");
    }
  } catch (error) {
    console.error("   ⚠️  Error cleaning up old backups:", error);
  }
}

// Run the script
backupFirestore()
  .then(() => {
    console.log("\n✨ Backup script completed!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Backup script failed:", error);
    process.exit(1);
  });
