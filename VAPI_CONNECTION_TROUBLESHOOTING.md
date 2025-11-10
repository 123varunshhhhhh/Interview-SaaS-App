# VAPI Connection Troubleshooting Guide

## Error: "daily-call-join-error" / "Meeting has ended"

Your call is failing to connect to Daily.co (the infrastructure VAPI uses for calls).

## Quick Diagnosis

### Step 1: Test Your Connection

1. Open `test-vapi-connection.html` in your browser
2. Click "Test Connection"
3. Check the logs for specific error messages

### Step 2: Check VAPI Dashboard

Go to https://vapi.ai/dashboard and verify:

- [ ] Your account is active
- [ ] You have credits or billing set up
- [ ] Assistant ID `75cb2fd1-b6da-4172-b056-849c6b76e205` exists
- [ ] The assistant is not paused or disabled
- [ ] Check "Call Logs" for any error messages

### Step 3: Browser Permissions

- [ ] Allow microphone access when prompted
- [ ] Check browser console for permission errors
- [ ] Try in Chrome (best compatibility)
- [ ] Try incognito mode (to rule out extensions)

### Step 4: Network Issues

- [ ] Check if you're behind a corporate firewall
- [ ] Try disabling VPN temporarily
- [ ] Check if Daily.co is accessible: https://www.daily.co/
- [ ] Try on a different network (mobile hotspot)

## Common Issues & Solutions

### Issue 1: Invalid Credentials

**Symptoms:** "start-method-error", immediate failure

**Solution:**

1. Go to VAPI Dashboard → Assistants
2. Find your assistant
3. Copy the Assistant ID again
4. Update `.env.local`:
   ```
   NEXT_PUBLIC_VAPI_ASSISTANT_ID=<new-id>
   ```
5. Restart your dev server

### Issue 2: No Credits/Billing

**Symptoms:** Call fails immediately, no specific error

**Solution:**

1. Go to VAPI Dashboard → Billing
2. Add payment method
3. Add credits
4. Try again

### Issue 3: Assistant Configuration Error

**Symptoms:** Call connects but ends immediately

**Solution:**

1. Go to VAPI Dashboard → Assistants
2. Edit your assistant
3. Make sure:
   - Model is selected (e.g., "gemini-1.5-pro")
   - Voice is selected (e.g., "jennifer" from 11labs)
   - Transcriber is configured (Deepgram Nova 2)
   - First message is set
4. Save and try again

### Issue 4: Microphone Permissions

**Symptoms:** Browser shows permission prompt, then fails

**Solution:**

1. Click the lock icon in browser address bar
2. Allow microphone access
3. Refresh the page
4. Try again

### Issue 5: Firewall/Network Blocking

**Symptoms:** "Signaling connection interrupted"

**Solution:**

1. Check if these domains are accessible:
   - `*.daily.co`
   - `*.vapi.ai`
   - WebRTC ports (UDP 3478, TCP 443)
2. Try on a different network
3. Contact your IT department if on corporate network

## Testing Steps

### Test 1: Simple HTML Test

```bash
# Open test-vapi-connection.html in browser
# Click "Test Connection"
# Check console for detailed errors
```

### Test 2: Check VAPI API Status

```bash
curl https://api.vapi.ai/assistant/75cb2fd1-b6da-4172-b056-849c6b76e205 \
  -H "Authorization: Bearer YOUR_VAPI_PRIVATE_KEY"
```

### Test 3: Create New Assistant

If all else fails:

1. Go to VAPI Dashboard
2. Create a new assistant from scratch
3. Use the minimal config from `vapi-minimal-test-config.json`
4. Update your `.env.local` with the new ID
5. Test again

## Still Not Working?

### Option 1: Check VAPI Status

- Visit https://status.vapi.ai/ (if available)
- Check VAPI Discord/Community for outages

### Option 2: Contact VAPI Support

- Email: support@vapi.ai
- Include:
  - Your account email
  - Assistant ID
  - Error logs from browser console
  - Timestamp of when you tried

### Option 3: Use Alternative Approach

If VAPI is having issues, you could temporarily:

1. Use a different voice AI service (ElevenLabs + OpenAI directly)
2. Wait for VAPI service to be restored
3. Check if your account needs verification

## Debug Checklist

Run through this checklist:

```
[ ] VAPI account is active and has credits
[ ] Assistant ID is correct and exists
[ ] Web token is valid
[ ] Browser has microphone permission
[ ] No firewall/VPN blocking
[ ] Tried in Chrome browser
[ ] Tried in incognito mode
[ ] Tried on different network
[ ] Assistant configuration is complete
[ ] No VAPI service outage
```

## Next Steps

1. Open `test-vapi-connection.html` and run the test
2. Check the browser console for the actual error message
3. Look for the `errorMessage` or `errorDetails` in the logs
4. Share those specific error details for more targeted help
