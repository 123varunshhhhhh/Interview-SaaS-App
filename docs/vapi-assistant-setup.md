# VAPI Assistant Setup Guide

## Overview

Your project uses 2 types of VAPI configurations:

1. **Workflow Assistant** - For collecting interview requirements
2. **Direct Assistant** - For conducting actual interviews

## Part 1: Workflow Assistant Setup

### Step 1: Create Workflow in VAPI Dashboard

1. **Login to VAPI Dashboard**

   - Go to https://dashboard.vapi.ai

2. **Navigate to Workflows**

   - Click "Workflows" in sidebar
   - Click "Create New Workflow"

3. **Basic Configuration**
   ```
   Name: Interview Question Generator
   Description: Collects user requirements to generate interview questions
   ```

### Step 2: Configure Workflow Settings

1. **First Message**

   ```
   Hi! I'm here to help you prepare for your interview. Let me ask you a few questions to create personalized interview questions for you. What job role are you preparing for?
   ```

2. **Voice Settings**

   ```json
   {
     "provider": "11labs",
     "voiceId": "sarah",
     "stability": 0.5,
     "similarityBoost": 0.7,
     "speed": 1.0
   }
   ```

3. **Model Configuration**

   ```json
   {
     "provider": "openai",
     "model": "gpt-3.5-turbo",
     "temperature": 0.7,
     "maxTokens": 150
   }
   ```

4. **System Prompt**

   ```
   You are an interview preparation assistant. Your job is to collect the following information from the user to generate relevant interview questions:

   1. Job role they're applying for (e.g., "Frontend Developer", "Data Scientist")
   2. Experience level (Junior, Mid-level, or Senior)
   3. Tech stack/skills (e.g., "React, Node.js, MongoDB")
   4. Interview type preference (Technical, Behavioral, or Mixed)

   IMPORTANT RULES:
   - Ask for ONE piece of information at a time
   - Keep responses short and conversational
   - Once you have all 4 pieces of information, summarize what you collected and say "Perfect! I have all the information I need. Your personalized interview questions will be generated shortly. Thank you!"
   - Then end the conversation

   Start by asking about the job role.
   ```

5. **Transcriber Settings**
   ```json
   {
     "provider": "deepgram",
     "model": "nova-2",
     "language": "en"
   }
   ```

### Step 3: Add Variables

Add these variables to your workflow:

- `username` (string) - User's name
- `userid` (string) - User's ID from your app

### Step 4: Save and Get Workflow ID

1. Click "Save Workflow"
2. Copy the Workflow ID (looks like: `2ac3b1f9-436b-42d6-980a-5e859ec53502`)
3. Update your `.env.local`:
   ```
   NEXT_PUBLIC_VAPI_WORKFLOW_ID=your_actual_workflow_id_here
   ```

## Part 2: Direct Assistant Configuration

Your direct assistant is already configured in `constants/index.ts`. Here's what each setting does:

### Voice Configuration

```typescript
voice: {
  provider: "11labs",        // Voice provider
  voiceId: "sarah",         // Voice character
  stability: 0.4,           // Voice consistency (0-1)
  similarityBoost: 0.8,     // Voice clarity (0-1)
  speed: 0.9,              // Speaking speed (0.5-2.0)
  style: 0.5,              // Voice style variation
  useSpeakerBoost: true    // Enhanced audio quality
}
```

### Model Configuration

```typescript
model: {
  provider: "openai",
  model: "gpt-4",          // AI model (can use gpt-3.5-turbo for cost savings)
  messages: [
    {
      role: "system",
      content: "Your interviewer prompt..."
    }
  ]
}
```

### Transcriber Configuration

```typescript
transcriber: {
  provider: "deepgram",
  model: "nova-2",         // Speech-to-text model
  language: "en"           // Language code
}
```

## Part 3: External API Keys Setup

### Required Services:

1. **OpenAI** (for AI responses)
2. **ElevenLabs** (for voice synthesis)
3. **Deepgram** (for speech recognition)

### Setup Steps:

#### 1. OpenAI Setup

1. Go to https://platform.openai.com
2. Create account and get API key
3. In VAPI dashboard → Settings → Integrations → OpenAI
4. Add your OpenAI API key

#### 2. ElevenLabs Setup

1. Go to https://elevenlabs.io
2. Create account and get API key
3. In VAPI dashboard → Settings → Integrations → ElevenLabs
4. Add your ElevenLabs API key

#### 3. Deepgram Setup

1. Go to https://deepgram.com
2. Create account and get API key
3. In VAPI dashboard → Settings → Integrations → Deepgram
4. Add your Deepgram API key

## Part 4: Testing Your Setup

### Test Workflow Assistant

1. Start your app: `npm run dev`
2. Sign in to your app
3. Go to `/interview` page
4. Click "Call" button
5. **Expected**: Voice asks about job role, experience, etc.

### Test Direct Assistant

1. Create a test interview in your Firebase
2. Go to `/interview/[test-id]` page
3. Click "Call" button
4. **Expected**: AI interviewer starts asking questions

## Part 5: Customization Options

### Voice Customization

```typescript
// Different voice options
voiceId: "sarah"; // Professional female
voiceId: "adam"; // Professional male
voiceId: "bella"; // Friendly female
voiceId: "josh"; // Casual male
```

### Model Customization

```typescript
// Cost vs Quality trade-offs
model: "gpt-4"; // Best quality, highest cost
model: "gpt-3.5-turbo"; // Good quality, lower cost
model: "gpt-3.5-turbo-16k"; // Longer context, medium cost
```

### Speed Optimization

```typescript
// Faster responses
model: "gpt-3.5-turbo",
temperature: 0.3,        // More focused responses
maxTokens: 100          // Shorter responses
```

## Troubleshooting

### Common Issues:

1. **"Failed to start call"**

   - Check web token in .env.local
   - Verify workflow ID exists
   - Check browser microphone permissions

2. **"No voice output"**

   - Verify ElevenLabs API key in VAPI dashboard
   - Check browser audio permissions
   - Try different voice ID

3. **"Poor transcription"**

   - Verify Deepgram API key
   - Check microphone quality
   - Ensure quiet environment

4. **"AI responses are bad"**
   - Check OpenAI API key
   - Review system prompts
   - Adjust temperature settings

### Debug Steps:

1. Check browser console for errors
2. Verify all API keys in VAPI dashboard
3. Test each service individually
4. Check VAPI dashboard logs

## Next Steps

1. ✅ Set up all API keys
2. ✅ Create and test workflow
3. ✅ Test direct assistant
4. ✅ Customize prompts and voices
5. ✅ Implement error handling
6. ✅ Monitor usage and costs
