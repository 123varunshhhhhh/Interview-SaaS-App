# VAPI Web Token Setup Guide

## Step 1: Create VAPI Account

1. **Visit VAPI Website**

   - Go to https://vapi.ai
   - Click "Sign Up" or "Get Started"

2. **Choose Your Plan**

   - **Free Tier**: Good for testing (limited minutes)
   - **Starter Plan**: $29-49/month (recommended for development)
   - **Pro Plan**: $99+/month (for production)

3. **Complete Registration**
   - Enter your email and password
   - Verify your email address
   - Complete profile setup

## Step 2: Get Your Web Token

1. **Login to VAPI Dashboard**

   - Go to https://dashboard.vapi.ai
   - Login with your credentials

2. **Navigate to API Keys**

   - Look for "API Keys" or "Tokens" in the sidebar
   - Or go to Settings → API Keys

3. **Create/Copy Web Token**

   - Find "Web Token" or "Public Token"
   - Click "Create New Token" if none exists
   - Copy the token (starts with something like `da9f912d-...`)

4. **Update Your Environment File**
   ```bash
   # In your .env.local file
   NEXT_PUBLIC_VAPI_WEB_TOKEN=your_actual_token_here
   ```

## Step 3: Verify Token Setup

1. **Check Token Format**

   - Should be a UUID format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
   - Should NOT start with `sk-` (that's a private key)

2. **Test Token**
   - Start your development server: `npm run dev`
   - Open browser console
   - Look for any VAPI connection errors

## Step 4: Security Best Practices

### ✅ DO:

- Use web token for frontend (it's safe to expose)
- Keep private API keys secret
- Use different tokens for development/production

### ❌ DON'T:

- Share your private API keys publicly
- Commit private keys to git
- Use production tokens in development

## Troubleshooting

### Token Not Working?

1. **Check Format**: Ensure it's the web token, not private key
2. **Check Permissions**: Verify token has correct permissions
3. **Check Plan**: Ensure your plan supports the features you're using
4. **Regenerate**: Try creating a new token

### Common Error Messages:

- `"Invalid token"` → Wrong token format or expired
- `"Insufficient permissions"` → Token doesn't have required permissions
- `"Rate limit exceeded"` → You've hit your plan limits

## Next Steps

After setting up your web token:

1. ✅ Create VAPI workflow (see vapi-workflow-setup.md)
2. ✅ Configure assistant (see vapi-assistant-setup.md)
3. ✅ Set up external API keys
4. ✅ Test your implementation
