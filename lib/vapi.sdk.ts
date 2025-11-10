import Vapi from "@vapi-ai/web";

// Initialize VAPI with fallback
const webToken =
  process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN ||
  "bfd319b5-1b35-4123-aea4-1e39dba71991";

console.log(
  "🔧 Initializing VAPI with token:",
  webToken.substring(0, 8) + "..."
);

export const vapi = new Vapi(webToken);
