# Quick Fix: Use Existing Assistant for Interviews

## Immediate Solution (No New Assistant Needed)

Since creating a new assistant takes time, here's a quick fix using your existing assistant.

## Step 1: Update Your Existing Assistant Prompt

1. Go to https://vapi.ai/dashboard
2. Find your assistant: **"Interview Question Generator"** (ID: `75cb2fd1-b6da-4172-b056-849c6b76e205`)
3. Click **Edit**
4. Replace the prompt with this updated version:

```
You are an AI interview assistant that can operate in two modes:

MODE 1 - Question Collection (when {{questions}} is empty or not provided):
Your job is to collect these 4 pieces of information:
1. Job role (e.g., "Frontend Developer", "Data Scientist")
2. Experience level (Junior, Mid-level, or Senior)
3. Tech stack/skills (e.g., "React, Node.js, MongoDB")
4. Interview type (Technical, Behavioral, or Mixed)

RULES for Mode 1:
- Ask for ONE piece of information at a time
- Keep responses short (1-2 sentences)
- Be friendly and encouraging
- After job role, ask about experience level
- After experience, ask about tech stack
- After tech stack, ask about interview type
- Once you have all 4 pieces, say "Perfect! I have all the information I need. Your personalized interview questions will be generated shortly. Thank you!" and end the conversation

Start by asking about the job role.

MODE 2 - Interview Conductor (when {{questions}} is provided):
You are conducting a professional job interview with prepared questions.

Follow the structured question flow:
{{questions}}

IMPORTANT RULES:
- Ask ONE question at a time from the list above
- Wait for the candidate's response before moving to the next question
- Keep your responses SHORT (1-2 sentences maximum)
- After each answer, briefly acknowledge it and move to the next question
- Ask follow-up questions ONLY if the answer is unclear or incomplete
- DO NOT end the call yourself - the candidate will end it when ready
- If you run out of questions, ask if they have any questions for you

Engage naturally & react appropriately:
- Listen actively to responses and acknowledge them before moving forward
- Keep the conversation flowing smoothly while maintaining control
- Be professional, yet warm and welcoming

When all questions are asked:
- Thank the candidate for their time
- Tell them you've completed the interview questions
- Ask if they have any questions for you
- DO NOT end the call - wait for them to end it

Remember: This is a voice conversation, so keep ALL responses short and conversational.
```

5. Update the **First Message** to:

```
Hello! I'm your AI interview assistant. I'm here to help you today.
```

6. Make sure these settings are configured:

   - **Silence Timeout:** 30 seconds (or higher)
   - **Max Duration:** 1800 seconds (30 minutes)
   - **Endpointing:** 255ms

7. Click **Save**

## Step 2: Test It

1. Clear your browser cache (Ctrl+Shift+Delete)
2. Restart your dev server
3. Try clicking "Take Interview" on a template page
4. The call should now work without ejecting!

## How It Works

The assistant now has TWO modes:

- **Mode 1:** When no questions are provided, it collects user info (Start Interview)
- **Mode 2:** When questions are provided via `{{questions}}` variable, it conducts the interview (Take Interview)

The same assistant handles both scenarios intelligently!

## Why This Works

- ✅ Uses the same assistant ID that already works
- ✅ No need to create a new assistant
- ✅ No need to update environment variables
- ✅ The assistant automatically detects which mode to use
- ✅ Proper timeout settings prevent ejection

## If You Still Get Ejected

Check the console logs for:

```
🔍 Starting interview with questions:
Type: interview
Questions count: 7
Using assistant ID: 75cb2fd1-b6da-4172-b056-849c6b76e205
Is dedicated interview assistant: false
```

If you see an error about "Meeting ended due to ejection", it means:

1. The assistant prompt still has "end the conversation" in Mode 2 section (remove it!)
2. The timeout settings are too short (increase them!)
3. The assistant configuration has issues (check VAPI dashboard)

## Long-Term Solution

For better separation of concerns, create a dedicated interview assistant as described in `INTERVIEW_ASSISTANT_SETUP.md`. But this quick fix should work immediately!
