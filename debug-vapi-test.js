// Simple VAPI Test Script
// Run this in browser console to test your VAPI connection

// Test 1: Check if VAPI token is valid
console.log("Testing VAPI Web Token...");
console.log("Token:", process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN);

// Test 2: Try to initialize VAPI
try {
  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN);
  console.log("✅ VAPI initialized successfully");

  // Test 3: Check workflow ID
  console.log("Workflow ID:", process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID);
} catch (error) {
  console.error("❌ VAPI initialization failed:", error);
}

// Test 4: Check browser permissions
navigator.mediaDevices
  .getUserMedia({ audio: true })
  .then(() => console.log("✅ Microphone access granted"))
  .catch((err) => console.error("❌ Microphone access denied:", err));
