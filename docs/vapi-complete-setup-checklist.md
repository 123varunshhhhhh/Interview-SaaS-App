# VAPI Complete Setup Checklist

## Pre-Setup Requirements

- [ ] Node.js and npm installed
- [ ] Project running locally (`npm run dev`)
- [ ] Firebase authentication working
- [ ] Browser with microphone access

## Phase 1: Account Setup

- [ ] Create VAPI account at https://vapi.ai
- [ ] Choose appropriate plan (Free for testing, Starter for development)
- [ ] Verify email and complete profile

## Phase 2: API Keys & Tokens

- [ ] Get VAPI web token from dashboard
- [ ] Update `.env.local` with web token
- [ ] Create OpenAI account and get API key
- [ ] Create ElevenLabs account and get API key
- [ ] Create Deepgram account and get API key
- [ ] Add all API keys to VAPI dashboard integrations

## Phase 3: Workflow Creation

- [ ] Create "Interview Question Generator" workflow
- [ ] Configure first message and system prompt
- [ ] Set voice settings (ElevenLabs, Sarah voice)
- [ ] Set model settings (GPT-3.5-turbo recommended)
- [ ] Set transcriber settings (Deepgram Nova-2)
- [ ] Add variables: `username`, `userid`
- [ ] Save workflow and copy ID
- [ ] Update `.env.local` with workflow ID

## Phase 4: Testing

- [ ] Test workflow assistant (`/interview` page)
  - [ ] Voice conversation starts
  - [ ] Asks about job role
  - [ ] Asks about experience level
  - [ ] Asks about tech stack
  - [ ] Asks about interview type
  - [ ] Ends conversation properly
- [ ] Test direct assistant (`/interview/[id]` page)
  - [ ] AI interviewer starts
  - [ ] Asks prepared questions
  - [ ] Responds to user answers
  - [ ] Maintains conversation flow

## Phase 5: Optimization

- [ ] Monitor usage and costs
- [ ] Adjust voice settings for quality/cost balance
- [ ] Optimize AI prompts for better responses
- [ ] Implement error handling
- [ ] Add usage limits if needed

## Environment Variables Checklist

```bash
# VAPI Configuration
NEXT_PUBLIC_VAPI_WEB_TOKEN=your_actual_web_token
NEXT_PUBLIC_VAPI_WORKFLOW_ID=your_actual_workflow_id

# Other services (already configured)
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
# ... Firebase config
```

## API Keys in VAPI Dashboard

- [ ] OpenAI API Key added
- [ ] ElevenLabs API Key added
- [ ] Deepgram API Key added

## Common Issues & Solutions

### ❌ "Failed to start call"

- ✅ Check web token format and validity
- ✅ Verify workflow ID exists in dashboard
- ✅ Check browser microphone permissions

### ❌ "No voice output"

- ✅ Verify ElevenLabs API key
- ✅ Check browser audio settings
- ✅ Try different voice ID

### ❌ "Poor transcription"

- ✅ Verify Deepgram API key
- ✅ Check microphone quality
- ✅ Speak clearly and avoid background noise

### ❌ "AI not responding well"

- ✅ Check OpenAI API key
- ✅ Review system prompts
- ✅ Check model settings

## Cost Monitoring

- [ ] Set up usage alerts in VAPI dashboard
- [ ] Monitor monthly spending
- [ ] Consider usage limits for users
- [ ] Plan for scaling costs

## Production Readiness

- [ ] Replace development tokens with production tokens
- [ ] Set up proper error logging
- [ ] Implement user usage limits
- [ ] Add payment/subscription system if needed
- [ ] Test with multiple users
- [ ] Monitor performance and reliability

## Support Resources

- 📖 VAPI Documentation: https://docs.vapi.ai
- 💬 VAPI Discord: https://discord.gg/vapi
- 📧 VAPI Support: support@vapi.ai
- 🐛 GitHub Issues: Your project repository

## Success Criteria

✅ **Setup Complete When:**

- Users can generate interview questions via voice
- Users can conduct voice interviews with AI
- Transcripts are captured accurately
- Feedback is generated after interviews
- No critical errors in console
- Costs are within expected range
