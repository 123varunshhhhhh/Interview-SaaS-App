# VAPI Cost Management Guide

## Current Configuration Costs (Approximate)

### Per Interview Session (5-10 minutes):

- **Voice Synthesis (ElevenLabs)**: $0.10-0.30
- **Speech-to-Text (Deepgram)**: $0.05-0.15
- **AI Model (GPT-4)**: $0.20-0.60
- **VAPI Platform Fee**: $0.05-0.15
- **Total per session**: $0.40-1.20

### Monthly Estimates:

- **10 interviews/month**: $4-12
- **100 interviews/month**: $40-120
- **1000 interviews/month**: $400-1200

## Cost Optimization Strategies

### 1. Switch to Cheaper Models

```typescript
// In constants/index.ts - Replace GPT-4 with GPT-3.5-turbo
model: {
  provider: "openai",
  model: "gpt-3.5-turbo", // Instead of "gpt-4"
}
```

**Savings**: 90% reduction in AI costs

### 2. Optimize Voice Settings

```typescript
// Reduce voice quality for lower costs
voice: {
  provider: "11labs",
  voiceId: "sarah",
  stability: 0.3,     // Lower = cheaper
  similarityBoost: 0.6, // Lower = cheaper
}
```

### 3. Implement Usage Limits

- Add interview limits per user
- Implement paid tiers for heavy usage
- Add session time limits

### 4. Use Alternative Providers

- **Voice**: Switch to cheaper TTS providers
- **STT**: Use browser's built-in speech recognition for basic use
- **AI**: Use local models or cheaper alternatives

## Free Tier Limitations

- **VAPI Free**: ~10-20 minutes/month
- **OpenAI Free**: $5 credit (expires)
- **ElevenLabs Free**: 10,000 characters/month
- **Deepgram Free**: $200 credit

## Production Recommendations

1. Start with free tiers for MVP
2. Monitor usage closely
3. Implement user limits
4. Consider freemium model
5. Budget $100-500/month for moderate usage
