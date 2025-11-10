# Critical Project Files - Complete Documentation

## PrepWise - AI Interview Preparation Platform

This document contains all critical files needed to understand and run the project.

---

## 📋 Table of Contents

### Part 1: Configuration & Environment

1. **package.json** - Dependencies and scripts
2. **.env.local** - Environment variables and API keys
3. **firebase/admin.ts** - Firebase Admin SDK (server-side)
4. **firebase/client.ts** - Firebase Client SDK (client-side)

### Part 2: Core Logic

5. **lib/vapi.sdk.ts** - VAPI SDK initialization
6. **lib/actions/auth.action.ts** - Authentication logic
7. **lib/actions/general.action.ts** - Interview & feedback logic
8. **constants/index.ts** - Core constants & interviewer config
9. **constants/interview-templates.ts** - Interview templates
10. **components/Agent.tsx** - VAPI call handler (MOST IMPORTANT!)

---

## 🔑 Key Technologies

- **Framework:** Next.js 15.5.2 with React 19
- **Authentication:** Firebase Auth
- **Database:** Firebase Firestore
- **AI Voice:** VAPI AI (@vapi-ai/web)
- **AI Generation:** Google Gemini (gemini-2.0-flash-001)
- **Styling:** Tailwind CSS
- **Forms:** React Hook Form + Zod validation

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create `.env.local` file with:

- VAPI credentials (Web Token & Assistant ID)
- Firebase configuration (both client and admin)
- Google Gemini API key

### 3. Run Development Server

```bash
npm run dev
```

### 4. Build for Production

```bash
npm run build
npm start
```

---

## 📁 File Descriptions

### Configuration Files

**package.json**

- Project metadata and dependencies
- Scripts for dev, build, backup, restore
- All npm packages used in the project

**.env.local**

- VAPI AI credentials for voice calls
- Firebase configuration (public & private)
- Google Gemini API key for AI generation
- Base URL configuration

### Firebase Setup

**firebase/admin.ts**

- Server-side Firebase initialization
- Handles authentication and Firestore on server
- Robust private key resolution for deployment
- Exports `auth` and `db` for server actions

**firebase/client.ts**

- Client-side Firebase initialization
- Handles authentication and Firestore in browser
- Validates configuration on startup
- Exports `auth` and `db` for client components

### Core Libraries

**lib/vapi.sdk.ts**

- Initializes VAPI Web SDK
- Exports singleton `vapi` instance
- Used by Agent component for voice calls

**lib/actions/auth.action.ts**

- Server actions for authentication
- Functions: signUp, signIn, signOut, getCurrentUser
- Session cookie management
- User database operations

**lib/actions/general.action.ts**

- Server actions for interviews and feedback
- Functions: createFeedback, getInterviewById, createInterviewPreparation
- AI-powered feedback generation using Gemini
- Firestore CRUD operations

### Constants

**constants/index.ts**

- Tech stack mappings for icons
- Interviewer assistant configuration
- Feedback schema (Zod validation)
- Interview covers and dummy data

**constants/interview-templates.ts**

- Pre-made interview templates
- 10 different roles (Frontend, Backend, Data Analyst, etc.)
- Questions for each role and level
- Helper functions to get templates

### Components

**components/Agent.tsx** (MOST IMPORTANT)

- Handles VAPI voice calls
- Manages call status (INACTIVE, CONNECTING, ACTIVE, FINISHED)
- Collects interview transcripts
- Generates scorecards and feedback
- Error handling and logging
- Two modes: "generate" (collect info) and "interview" (ask questions)

---

## 🔄 Application Flow

### Interview Preparation Flow

1. User clicks "Start Interview"
2. Agent.tsx starts VAPI call with assistant
3. Assistant collects: job role, experience level, tech stack, interview type
4. Call ends, transcript is sent to /api/generate-scorecard
5. AI generates personalized scorecard
6. Data saved to Firestore
7. User redirected to scorecard page

### Template Interview Flow

1. User selects a template (e.g., Frontend Developer)
2. Template page loads with prepared questions
3. User clicks "Call" button
4. Agent.tsx starts VAPI call with questions
5. Assistant asks questions one by one
6. User answers each question
7. User clicks "End" to finish
8. Feedback generated and saved
9. User redirected to feedback page

---

## 🔐 Security Notes

- Never commit `.env.local` to Git
- Firebase private key is sensitive - keep secure
- Session cookies are httpOnly and secure in production
- All server actions validate user authentication
- Firestore rules should restrict client access

---

## 📊 Database Structure

### Firestore Collections

**users/**

- id: user UID
- name: string
- email: string

**interviews/**

- id: auto-generated
- userId: string
- userName: string
- type: "preparation" | "interview"
- jobRole: string
- experienceLevel: string
- techStack: array of strings
- interviewType: string
- transcript: array of messages
- finalized: boolean
- createdAt: ISO timestamp

**feedback/**

- id: auto-generated
- interviewId: string
- userId: string
- totalScore: number
- categoryScores: array of objects
- strengths: array of strings
- areasForImprovement: array of strings
- finalAssessment: string
- createdAt: ISO timestamp

---

## 🛠️ Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server
npm run lint             # Run ESLint
npm run backup           # Backup Firestore to JSON
npm run restore          # Restore Firestore from JSON
npm run regenerate-feedback  # Regenerate missing feedback
```

---

## 📝 Important Notes

1. **VAPI Assistant Configuration**

   - Main assistant handles both question collection and interviews
   - Uses `{{questions}}` variable for dynamic questions
   - Must be configured in VAPI dashboard with proper timeouts

2. **Google Gemini Usage**

   - Used for scorecard generation
   - Used for feedback analysis
   - Model: gemini-2.0-flash-001
   - Requires GOOGLE_GENERATIVE_AI_API_KEY

3. **Firebase Admin SDK**

   - Requires service account private key
   - Used for server-side operations only
   - Never expose admin credentials to client

4. **Error Handling**
   - Agent.tsx has comprehensive error logging
   - All server actions return success/failure objects
   - User-friendly error messages displayed

---

## 🎯 Next Steps

1. Review all files in CRITICAL_FILES_PART1.md and CRITICAL_FILES_PART2.md
2. Set up your .env.local with correct credentials
3. Configure VAPI assistant in dashboard
4. Test the application locally
5. Deploy to Vercel or your preferred platform

---

## 📞 Support

For issues or questions:

1. Check console logs for detailed error messages
2. Verify all environment variables are set correctly
3. Ensure Firebase and VAPI credentials are valid
4. Review the debug markdown files for troubleshooting

---

**Created:** November 9, 2025
**Project:** PrepWise
**Version:** 0.1.0
