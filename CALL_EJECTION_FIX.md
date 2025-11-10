# Call Ejection Fix - Take Interview Issue

## Problem

When clicking "Take Interview" on template pages, the VAPI call was getting ejected/ended prematurely, while "Start Interview" worked fine.

## Root Causes Identified

### 1. Missing Configuration Parameters

The `interviewer` constant in `constants/index.ts` was missing critical timeout and configuration settings:

- No `silenceTimeoutSeconds` (defaulted to too short)
- No `maxDurationSeconds` (defaulted to too short)
- No `backgroundSound` setting
- No `temperature` and `maxTokens` in model config
- No `endpointing` in transcriber config

### 2. Ambiguous Prompt Instructions

The interviewer prompt had vague instructions about ending the conversation:

- "Conclude the interview properly" without clear guidance
- "End the conversation on a polite and positive note" - could be interpreted as ending the call
- No explicit instruction to NOT end the call automatically

### 3. Missing Explicit Rules

The prompt didn't clearly state:

- That the assistant should NOT end the call itself
- That the candidate controls when to end
- What to do after all questions are asked

## Fixes Applied

### 1. Added Configuration Parameters (`constants/index.ts`)

```typescript
transcriber: {
  provider: "deepgram",
  model: "nova-2",
  language: "en",
  endpointing: 255,  // ← Added
},
voice: {
  provider: "11labs",
  voiceId: "sarah",
  // Removed unnecessary voice parameters that could cause issues
},
silenceTimeoutSeconds: 30,  // ← Added
maxDurationSeconds: 1800,   // ← Added (30 minutes)
backgroundSound: "off",     // ← Added
model: {
  provider: "openai",
  model: "gpt-4",
  temperature: 0.7,   // ← Added
  maxTokens: 250,     // ← Added
  // ...
}
```

### 2. Updated Interviewer Prompt

Added explicit rules to prevent auto-ending:

```
IMPORTANT RULES:
- Ask ONE question at a time from the list above
- Wait for the candidate's response before moving to the next question
- Keep your responses SHORT (1-2 sentences maximum)
- After each answer, briefly acknowledge it and move to the next question
- Ask follow-up questions ONLY if the answer is unclear or incomplete
- DO NOT end the call yourself - the candidate will end it when ready  ← KEY FIX
- If you run out of questions, ask if they have any questions for you

When all questions are asked:
- Thank the candidate for their time
- Tell them you've completed the interview questions
- Ask if they have any questions for you
- DO NOT end the call - wait for them to end it  ← KEY FIX
```

### 3. Enhanced Error Logging (`components/Agent.tsx`)

Added comprehensive error logging for the "interview" type to help debug future issues:

- Logs questions being passed
- Logs interviewer configuration
- Catches and displays detailed error messages
- Helps identify configuration problems quickly

## Why "Start Interview" Worked But "Take Interview" Didn't

### Start Interview (type === "generate")

- Uses assistant ID: `75cb2fd1-b6da-4172-b056-849c6b76e205`
- This assistant is configured in VAPI dashboard with proper timeouts
- Has explicit workflow configuration
- Works reliably

### Take Interview (type === "interview")

- Uses the `interviewer` constant defined in code
- Was missing timeout configurations
- Had ambiguous prompt about ending calls
- Would timeout or end prematurely

## Testing Checklist

After these fixes, test the following:

1. ✅ Click "Take Interview" on a template page
2. ✅ Verify call connects successfully
3. ✅ Verify interviewer asks questions one by one
4. ✅ Verify call stays active after answering questions
5. ✅ Verify interviewer doesn't auto-end the call
6. ✅ Verify you can manually end the call with "End" button
7. ✅ Verify scorecard generates correctly after ending

## Additional Notes

- The `silenceTimeoutSeconds: 30` gives users 30 seconds to respond before timeout
- The `maxDurationSeconds: 1800` allows up to 30 minutes for the interview
- The `endpointing: 255` helps with better speech detection
- The explicit "DO NOT end the call" instructions prevent premature endings

## If Issues Persist

Check the browser console for:

```
🔍 Starting interview with questions:
Type: interview
Questions count: X
Formatted questions: ...
```

If you see errors, they will now be logged with detailed information to help debug.
