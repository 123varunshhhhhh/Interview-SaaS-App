# 🚀 Deployment Checklist

## Pre-Deployment Steps

### ✅ 1. Environment Variables

- [ ] All API keys are configured in production environment
- [ ] Firebase credentials are set up
- [ ] VAPI credentials are working
- [ ] Google AI API key is active
- [ ] Base URL is updated for production domain

### ✅ 2. VAPI Assistant Configuration

- [ ] Assistant is using OpenAI GPT-4 (NOT Google Gemini)
- [ ] Comprehensive system prompt is applied
- [ ] Voice and transcriber are configured
- [ ] Timeout settings are proper (30s silence, 30min max)

### ✅ 3. Firebase Setup

- [ ] Firestore security rules are deployed
- [ ] Authentication is enabled
- [ ] Service account permissions are correct
- [ ] Database indexes are created if needed

### ✅ 4. Code Quality

- [ ] All TypeScript errors are resolved
- [ ] ESLint warnings are addressed
- [ ] Build completes successfully (`npm run build`)
- [ ] All features tested locally

## Deployment Steps

### Option 1: Vercel (Recommended)

1. **Connect Repository**

   ```bash
   # Push to GitHub first
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables
   - Deploy

3. **Environment Variables in Vercel**
   ```
   NEXT_PUBLIC_VAPI_WEB_TOKEN
   NEXT_PUBLIC_VAPI_ASSISTANT_ID
   GOOGLE_GENERATIVE_AI_API_KEY
   NEXT_PUBLIC_BASE_URL (update to your domain)
   NEXT_PUBLIC_FIREBASE_API_KEY
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
   NEXT_PUBLIC_FIREBASE_PROJECT_ID
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
   NEXT_PUBLIC_FIREBASE_APP_ID
   FIREBASE_PROJECT_ID
   FIREBASE_CLIENT_EMAIL
   FIREBASE_PRIVATE_KEY
   ```

### Option 2: Other Platforms

- **Netlify**: Similar process, add env vars in Netlify dashboard
- **Railway**: Connect GitHub, add env vars, deploy
- **AWS Amplify**: Use AWS console to deploy

## Post-Deployment Verification

### ✅ 1. Basic Functionality

- [ ] Website loads correctly
- [ ] Authentication works (sign up/sign in)
- [ ] Interview templates are visible
- [ ] User can navigate between pages

### ✅ 2. Interview Features

- [ ] "Start Interview" works (question collection)
- [ ] "Take Interview" works (template interviews)
- [ ] VAPI calls connect successfully
- [ ] Voice conversation works
- [ ] Call can be ended manually
- [ ] Scorecard generates after interview

### ✅ 3. Data Persistence

- [ ] User accounts are created in Firebase
- [ ] Interview data is saved
- [ ] Feedback is generated and stored
- [ ] User can view past interviews

### ✅ 4. Performance

- [ ] Page load times are acceptable
- [ ] Images and assets load properly
- [ ] Mobile responsiveness works
- [ ] No console errors in production

## Production Environment Variables

Update these for production:

```env
# Update base URL to your domain
NEXT_PUBLIC_BASE_URL=https://your-domain.com

# Ensure all other variables are production-ready
NEXT_PUBLIC_VAPI_WEB_TOKEN=your-production-token
NEXT_PUBLIC_VAPI_ASSISTANT_ID=your-production-assistant
GOOGLE_GENERATIVE_AI_API_KEY=your-production-key
# ... etc
```

## Monitoring & Maintenance

### ✅ 1. Set Up Monitoring

- [ ] Vercel Analytics (if using Vercel)
- [ ] Firebase Analytics
- [ ] Error tracking (Sentry, LogRocket, etc.)

### ✅ 2. Regular Maintenance

- [ ] Monitor API usage and costs
- [ ] Check Firebase quotas
- [ ] Update dependencies regularly
- [ ] Backup Firestore data periodically

## Troubleshooting Common Deployment Issues

### 1. Build Failures

```bash
# Check for TypeScript errors
npm run build

# Fix any errors and redeploy
```

### 2. Environment Variable Issues

- Ensure all variables are set in deployment platform
- Check for typos in variable names
- Verify Firebase private key formatting

### 3. VAPI Connection Issues

- Verify assistant ID is correct
- Check VAPI dashboard for assistant status
- Ensure model is set to OpenAI

### 4. Firebase Issues

- Check Firestore security rules
- Verify service account permissions
- Ensure authentication is enabled

## Success Criteria

Your deployment is successful when:

✅ Users can sign up and sign in
✅ Interview templates load and display correctly
✅ VAPI calls connect and work properly
✅ Voice conversations function smoothly
✅ Scorecards generate after interviews
✅ Data persists in Firebase
✅ No critical console errors
✅ Mobile experience works well

## Rollback Plan

If deployment fails:

1. **Immediate Rollback**

   - Revert to previous working commit
   - Redeploy previous version

2. **Fix and Redeploy**

   - Identify and fix the issue
   - Test locally
   - Deploy again

3. **Emergency Contacts**
   - Have VAPI support contact ready
   - Firebase support documentation
   - Deployment platform support

---

**Ready to Deploy! 🚀**
