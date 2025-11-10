# Fix 400 Bad Request Error - Quick Checklist

## The Error

```
POST https://api.vapi.ai/call/web 400 (Bad Request)
```

This means VAPI is rejecting your assistant configuration.

## Quick Fix Checklist

### ✅ Step 1: Verify Assistant ID (MOST IMPORTANT)

1. Open https://vapi.ai/dashboard
2. Click "Assistants" in sidebar
3. Look for your assistant: `898b325c-5f13-4bdf-a44d-12b21127781d`
4. **Can you find it?**
   - ❌ **NO** → The ID is wrong! Copy the correct ID from the assistant you created
   - ✅ **YES** → Continue to Step 2

### ✅ Step 2: Check Assistant Configuration

Click on the assistant and verify ALL these are filled:

**Required Fields:**

- [ ] **Name** - Has a name (e.g., "Interview Conductor")
- [ ] **First Message** - Has a greeting message
- [ ] **Model** - Provider and model selected (e.g., OpenAI gpt-4)
- [ ] **Voice** - Provider and voice selected (e.g., 11Labs Sarah)
- [ ] **Transcriber** - Provider and model selected (e.g., Deepgram nova-2)
- [ ] **System Prompt** - Has a prompt with `{{questions}}` variable

**If ANY of these are missing, fill them in and save!**

### ✅ Step 3: Check the Prompt Has {{questions}}

Your assistant prompt MUST include the `{{questions}}` variable:

```
You are a professional interviewer.

Follow these questions:
{{questions}}

Ask them one by one and wait for responses.
```

**Without `{{questions}}`, the assistant won't know what to ask!**

### ✅ Step 4: Update .env.local with Correct ID

1. Open `.env.local`
2. Find this line:

```env
NEXT_PUBLIC_VAPI_INTERVIEW_ASSISTANT_ID=898b325c-5f13-4bdf-a44d-12b21127781d
```

3. Replace with the CORRECT assistant ID from VAPI dashboard
4. Save the file

### ✅ Step 5: Restart Dev Server

**IMPORTANT:** Environment variables only load at startup!

```bash
# Stop your dev server (Ctrl+C)
# Then start it again
npm run dev
```

### ✅ Step 6: Clear Browser Cache

```
Press: Ctrl + Shift + Delete
Clear: Cached images and files
Time range: Last hour
Click: Clear data
```

### ✅ Step 7: Test Again

1. Go to a template page
2. Click "Call" button
3. Check console logs for:

```
Using assistant ID: [your-id]
Is dedicated interview assistant: true
Starting VAPI call with config: {...}
```

## If Still Getting 400 Error

### Option A: Use the Working Assistant (Quick Fix)

1. Open `.env.local`
2. Comment out or delete this line:

```env
# NEXT_PUBLIC_VAPI_INTERVIEW_ASSISTANT_ID=898b325c-5f13-4bdf-a44d-12b21127781d
```

3. Save and restart dev server
4. The code will use the working assistant: `75cb2fd1-b6da-4172-b056-849c6b76e205`
5. Update that assistant's prompt to handle interviews (see `QUICK_FIX_INSTRUCTIONS.md`)

### Option B: Create New Assistant from Scratch

1. Go to VAPI Dashboard
2. Click "Create Assistant"
3. Fill in ALL fields carefully:

**Name:** Interview Conductor

**First Message:**

```
Hello! Thank you for taking the time to speak with me today. I'm excited to learn more about you and your experience. Let's begin with the first question.
```

**Model:**

- Provider: OpenAI
- Model: gpt-4
- Temperature: 0.7
- Max Tokens: 250

**Voice:**

- Provider: 11Labs
- Voice: Sarah (or any professional voice)

**Transcriber:**

- Provider: Deepgram
- Model: nova-2
- Language: English

**System Prompt:**

```
You are a professional job interviewer conducting a real-time voice interview with a candidate.

Follow the structured question flow:
{{questions}}

IMPORTANT RULES:
- Ask ONE question at a time from the list above
- Wait for the candidate's response before moving to the next question
- Keep your responses SHORT (1-2 sentences maximum)
- After each answer, briefly acknowledge it and move to the next question
- DO NOT end the call yourself - the candidate will end it when ready
- If you run out of questions, ask if they have any questions for you

When all questions are asked:
- Thank the candidate for their time
- Tell them you've completed the interview questions
- Ask if they have any questions for you
- DO NOT end the call - wait for them to end it

Remember: This is a voice conversation, so keep ALL responses short and conversational.
```

**Advanced Settings:**

- Silence Timeout: 30 seconds
- Max Duration: 1800 seconds
- Endpointing: 255ms

4. Click **Save**
5. Copy the assistant ID
6. Update `.env.local` with the new ID
7. Restart dev server
8. Test again

## Common Mistakes

❌ **Forgot to save assistant** - Click Save in VAPI dashboard!
❌ **Wrong assistant ID** - Copy-paste carefully
❌ **Didn't restart dev server** - Env vars need restart
❌ **Missing {{questions}} variable** - Must be in prompt
❌ **Assistant in draft mode** - Make sure it's published/active
❌ **Missing model/voice/transcriber** - All required!

## Success Indicators

When it works, you'll see:

```
🔍 Starting interview with questions:
Type: interview
Questions count: 7
Using assistant ID: 898b325c-5f13-4bdf-a44d-12b21127781d
Is dedicated interview assistant: true
Starting VAPI call with config: {...}
🟢 Call started successfully!
⏰ Call start time: [timestamp]
```

And the call will connect without errors!
