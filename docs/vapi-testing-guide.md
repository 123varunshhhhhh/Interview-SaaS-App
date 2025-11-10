# VAPI Testing Guide

## Prerequisites

1. ✅ VAPI account created
2. ✅ Web token added to .env.local
3. ✅ Workflow created and ID added
4. ✅ External API keys configured in VAPI dashboard

## Testing Steps

### Test 1: Interview Generation Flow

1. Start your development server: `npm run dev`
2. Sign up/Sign in to your app
3. Navigate to `/interview`
4. Click "Call" button
5. **Expected**: Voice conversation starts asking about job role, experience, etc.

### Test 2: Interview Conduct Flow

1. Create an interview (either via VAPI workflow or manually in Firebase)
2. Navigate to `/interview/[interview-id]`
3. Click "Call" button
4. **Expected**: AI interviewer starts asking the generated questions

### Test 3: Error Handling

1. Try with invalid VAPI tokens
2. **Expected**: Clear error messages in console and UI

## Common Issues & Solutions

### Issue: "Failed to start call"

- **Solution**: Check VAPI web token in .env.local
- **Solution**: Verify workflow ID exists in VAPI dashboard

### Issue: "No audio/voice"

- **Solution**: Check browser microphone permissions
- **Solution**: Verify ElevenLabs API key in VAPI dashboard

### Issue: "Transcription not working"

- **Solution**: Check Deepgram API key in VAPI dashboard
- **Solution**: Verify microphone is working

### Issue: "AI responses are poor"

- **Solution**: Check OpenAI API key in VAPI dashboard
- **Solution**: Review system prompts in constants/index.ts
