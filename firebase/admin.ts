import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// Initialize Firebase Admin SDK
function initFirebaseAdmin() {
  const apps = getApps();

  if (!apps.length) {
    // Resolve the private key from env in a robust way across local/Vercel
    const resolvePrivateKey = (): string | undefined => {
      const rawKey = process.env.FIREBASE_PRIVATE_KEY;
      const b64Key = process.env.FIREBASE_PRIVATE_KEY_BASE64;
      const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;

      if (rawKey) {
        // Some providers wrap the key in quotes and escape newlines
        let trimmed = rawKey.trim().replace(/^\"|\"$/g, "");
        // Fix encoding issues (e.g., PRIVATEÂ KEY -> PRIVATE KEY)
        // Replace any corrupted END marker (handles encoding issues like PRIVATEÂ KEY)
        trimmed = trimmed.replace(/-----END\s+PRIVATE[^\s\-]*\s+KEY-----/g, "-----END PRIVATE KEY-----");
        // Replace any corrupted BEGIN marker  
        trimmed = trimmed.replace(/-----BEGIN\s+PRIVATE[^\s\-]*\s+KEY-----/g, "-----BEGIN PRIVATE KEY-----");
        // Handle encoding issues: replace "PRIVATE" + any non-standard chars + "KEY" with "PRIVATE KEY"
        trimmed = trimmed.replace(/PRIVATE[^A-Z\s]+KEY/gi, "PRIVATE KEY");
        // Normalize newlines
        trimmed = trimmed.replace(/\\n/g, "\n").replace(/\r\n/g, "\n");
        // Ensure proper PEM format
        if (!trimmed.includes("-----BEGIN PRIVATE KEY-----")) {
          throw new Error("Private key missing BEGIN marker");
        }
        if (!trimmed.includes("-----END PRIVATE KEY-----")) {
          throw new Error("Private key missing END marker");
        }
        return trimmed;
      }

      if (b64Key) {
        try {
          const decoded = Buffer.from(b64Key, "base64").toString("utf8");
          return decoded.replace(/\r\n/g, "\n");
        } catch {
          // fallthrough
        }
      }

      if (serviceAccountJson) {
        try {
          const maybeDecoded = /\{/.test(serviceAccountJson)
            ? serviceAccountJson
            : Buffer.from(serviceAccountJson, "base64").toString("utf8");
          const parsed = JSON.parse(maybeDecoded);
          return (parsed.private_key as string | undefined)
            ?.replace(/\\n/g, "\n")
            .replace(/\r\n/g, "\n");
        } catch {
          // fallthrough
        }
      }

      return undefined;
    };

    const privateKey = resolvePrivateKey();

    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey,
      }),
    });
  }

  return {
    auth: getAuth(),
    db: getFirestore(),
  };
}

export const { auth, db } = initFirebaseAdmin();
