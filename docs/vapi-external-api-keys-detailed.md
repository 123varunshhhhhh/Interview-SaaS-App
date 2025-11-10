# VAPI External API Keys - Detailed Setup Guide

## Part 1: OpenAI API Key Setup

### Step 1: Go to OpenAI Platform

1. **Open your browser**
2. **Go to:** https://platform.openai.com
3. **You'll see the OpenAI Platform homepage**

### Step 2: Create Account or Sign In

1. **If you don't have an account:**
   - Click **"Sign up"** button (top right)
   - Enter your email address
   - Create a password
   - Verify your email
   - Complete phone verification
2. **If you have an account:**
   - Click **"Log in"** button
   - Enter your credentials

### Step 3: Navigate to API Keys

1. **After logging in, look for the left sidebar**
2. **Click on "API keys"** (looks like a key icon)
3. **Or go directly to:** https://platform.openai.com/api-keys

### Step 4: Create New API Key

1. **Click the green "Create new secret key" button**
2. **Give it a name:** `VAPI Integration Key`
3. **Set permissions:** Leave as default (All)
4. **Click "Create secret key"**

### Step 5: Copy the API Key

1. **IMPORTANT:** Copy the key immediately (starts with `sk-`)
2. **Example format:** `sk-proj-abc123def456ghi789...`
3. **Save it somewhere safe** - you won't see it again!

### Step 6: Add to VAPI Dashboard

1. **Go back to your VAPI dashboard**
2. **Click "Settings" in the left sidebar**
3. **Click "Integrations"**
4. **Find "OpenAI" section**
5. **Paste your API key** in the OpenAI field
6. **Click "Save" or "Update"**

---

## Part 2: ElevenLabs API Key Setup

### Step 1: Go to ElevenLabs

1. **Open new browser tab**
2. **Go to:** https://elevenlabs.io
3. **You'll see the ElevenLabs homepage**

### Step 2: Create Account

1. **Click "Get Started Free" or "Sign Up"**
2. **Enter your email address**
3. **Create a password**
4. **Verify your email**
5. **Complete the onboarding (choose voice preferences)**

### Step 3: Navigate to Profile Settings

1. **After signing in, look for your profile picture/avatar** (top right)
2. **Click on your profile picture**
3. **Select "Profile" from the dropdown menu**
4. **Or go directly to:** https://elevenlabs.io/profile

### Step 4: Find API Key Section

1. **On your profile page, scroll down**
2. **Look for "API Key" section**
3. **You'll see a field with your API key**

### Step 5: Copy the API Key

1. **Click the "Copy" button** next to your API key
2. **Example format:** `abc123def456ghi789jkl...`
3. **Save it somewhere safe**

### Step 6: Add to VAPI Dashboard

1. **Go back to VAPI dashboard → Settings → Integrations**
2. **Find "ElevenLabs" section**
3. **Paste your API key** in the ElevenLabs field
4. **Click "Save" or "Update"**

---

## Part 3: Deepgram API Key Setup

### Step 1: Go to Deepgram

1. **Open new browser tab**
2. **Go to:** https://deepgram.com
3. **You'll see the Deepgram homepage**

### Step 2: Create Account

1. **Click "Sign Up Free" or "Get Started"**
2. **Enter your email address**
3. **Create a password**
4. **Verify your email**
5. **Complete company information (can use personal info)**

### Step 3: Navigate to API Keys

1. **After signing in, look for the left sidebar**
2. **Click "API Keys"** (key icon)
3. **Or look for "Settings" → "API Keys"**
4. **Or go to:** https://console.deepgram.com/project/[your-project]/keys

### Step 4: Create New API Key

1. **Click "Create a New API Key" button**
2. **Give it a name:** `VAPI Integration`
3. **Set permissions:** Leave as default (Member)
4. **Click "Create Key"**

### Step 5: Copy the API Key

1. **Copy the generated API key immediately**
2. **Example format:** `abc123def456ghi789jkl...`
3. **Save it somewhere safe**

### Step 6: Add to VAPI Dashboard

1. **Go back to VAPI dashboard → Settings → Integrations**
2. **Find "Deepgram" section**
3. **Paste your API key** in the Deepgram field
4. **Click "Save" or "Update"**

---

## Part 4: Verify All Keys in VAPI

### Final Verification Steps:

1. **Go to VAPI Dashboard → Settings → Integrations**
2. **Check that all three sections show:**
   - ✅ **OpenAI:** Key added (shows `sk-proj-...`)
   - ✅ **ElevenLabs:** Key added (shows partial key)
   - ✅ **Deepgram:** Key added (shows partial key)
3. **Click "Test Connection" if available**
4. **Save all changes**

---

## Important Notes:

### Free Tier Limits:

- **OpenAI:** $5 free credit (expires after 3 months)
- **ElevenLabs:** 10,000 characters/month free
- **Deepgram:** $200 free credit

### Security Tips:

- ⚠️ **Never share your API keys publicly**
- ⚠️ **Don't commit them to GitHub**
- ⚠️ **Keep them secure and private**
- ✅ **Only add them to VAPI dashboard**

### Troubleshooting:

- **If keys don't work:** Check for extra spaces when copying
- **If quota exceeded:** Check your usage in each platform
- **If connection fails:** Verify the key format is correct

---

## Next Steps After Setup:

1. ✅ All three API keys added to VAPI
2. ✅ Test your workflow
3. ✅ Check for any error messages
4. ✅ Monitor usage and costs
