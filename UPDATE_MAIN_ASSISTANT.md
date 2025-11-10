# Update Your Main Assistant for Interviews

## What Changed

- ✅ Removed the separate interview assistant ID
- ✅ Now using ONE assistant for everything: `75cb2fd1-b6da-4172-b056-849c6b76e205`
- ✅ Simplified the code

## What You Need to Do

### Update Your Assistant Prompt in VAPI Dashboard

1. **Go to VAPI Dashboard:** https://vapi.ai/dashboard
2. **Find your assistant:** `75cb2fd1-b6da-4172-b056-849c6b76e205` (Interview Question Generator)
3. **Click Edit**
4. **Replace the prompt with this:**

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

5. **Update First Message to:**

```
Hello! I'm your AI interview assistant. I'm here to help you today.
```

6. **Check Model Settings:**

   - **Provider:** OpenAI (NOT Google - to avoid 503 errors)
   - **Model:** gpt-4 or gpt-3.5-turbo
   - **Temperature:** 0.7
   - **Max Tokens:** 250

7. **Check Advanced Settings:**

   - **Silence Timeout:** 30 seconds
   - **Max Duration:** 1800 seconds (30 minutes)
   - **Endpointing:** 255ms

8. **Click Save**

## How It Works Now

### Scenario 1: Start Interview (Question Collection)

User clicks "Start Interview" → Assistant collects info → Generates questions

**Flow:**

1. User: Clicks "Start Interview"
2. Assistant: "What job role are you preparing for?"
3. User: "Frontend Developer"
4. Assistant: "What's your experience level?"
5. User: "Mid-level"
6. Assistant: "What tech stack do you use?"
7. User: "React and Node.js"
8. Assistant: "What type of interview?"
9. User: "Technical"
10. Assistant: "Perfect! I have all the information..." (ends call)
11. System: Generates questions and scorecard

### Scenario 2: Take Interview (Template)

User clicks "Take Interview" on template → Assistant asks prepared questions

**Flow:**

1. User: Clicks "Take Interview" on Frontend Developer template
2. Assistant receives questions via `{{questions}}` variable
3. Assistant: "Hello! Let's begin. What is the difference between let, const, and var?"
4. User: Answers
5. Assistant: "Great! Next question: Explain the box model in CSS."
6. User: Answers
7. ... continues through all questions
8. Assistant: "Thank you! I've completed all questions. Do you have any questions for me?"
9. User: Clicks "End" button
10. System: Generates feedback

## The Magic

The assistant automatically detects which mode to use:

- **No questions provided** → Mode 1 (Question Collection)
- **Questions provided** → Mode 2 (Interview Conductor)

It's ONE assistant that handles BOTH scenarios intelligently!

## Testing

After updating the assistant:

1. **Test "Start Interview":**

   - Go to home page
   - Click "Start Interview"
   - Answer the 4 questions
   - Verify it ends and generates questions

2. **Test "Take Interview":**
   - Go to a template page (e.g., Frontend Developer)
   - Click "Call"
   - Verify it asks the prepared questions
   - Verify it doesn't auto-end
   - Click "End" manually
   - Verify feedback is generated

## Benefits

✅ **Simpler:** One assistant instead of two
✅ **Easier to maintain:** Update one prompt, not two
✅ **More reliable:** No confusion about which assistant to use
✅ **Cost effective:** One assistant = lower costs
✅ **Flexible:** Easy to add new modes in the future

## Summary

**What you did:**

- Removed the separate interview assistant ID
- Simplified the code to use one assistant

**What you need to do:**

- Update your main assistant prompt in VAPI dashboard
- Switch model to OpenAI (to avoid Google 503 errors)
- Test both "Start Interview" and "Take Interview"

That's it! Much simpler now.
