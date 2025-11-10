# Interview SaaS - AI-Powered Interview Practice Platform

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Firebase](https://img.shields.io/badge/Firebase-10-orange?style=for-the-badge&logo=firebase)
![VAPI](https://img.shields.io/badge/VAPI-AI-green?style=for-the-badge)
![Gemini](https://img.shields.io/badge/Google-Gemini-blue?style=for-the-badge&logo=google)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

A comprehensive SaaS platform that provides AI-powered interview practice with real-time voice conversations, instant feedback, and detailed performance scorecards.

## 🚀 Features

- **AI Voice Interviews**: Real-time voice conversations with AI interviewer
- **Multiple Interview Types**: Frontend, Backend, Data Analyst, DevOps, QA, Product Manager, etc.
- **Experience Levels**: Junior, Mid-level, and Senior positions
- **Instant Feedback**: AI-generated scorecards and recommendations
- **Firebase Integration**: User authentication and data storage
- **Responsive Design**: Works on desktop and mobile devices

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd interview-edge
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Variables Setup

Create a `.env.local` file in the root directory and add the following variables:

```env
# Vapi AI Configuration
NEXT_PUBLIC_VAPI_WEB_TOKEN=your-vapi-web-token
NEXT_PUBLIC_VAPI_ASSISTANT_ID=your-vapi-assistant-id

# Google Gemini AI
GOOGLE_GENERATIVE_AI_API_KEY=your-google-ai-api-key

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Firebase Configuration (Public)
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Firebase Configuration (Server-side)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account-email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour-private-key\n-----END PRIVATE KEY-----\n"
```

### 4. Required Service Accounts & API Keys

#### A. VAPI AI Setup

1. Go to [VAPI Dashboard](https://vapi.ai/dashboard)
2. Create an account and get your **Web Token**
3. Create an assistant and get the **Assistant ID**
4. Copy the comprehensive system prompt from `COMPREHENSIVE_SYSTEM_PROMPT.md`
5. Configure your assistant with:
   - **Model**: OpenAI GPT-4
   - **Voice**: 11Labs (any professional voice)
   - **Transcriber**: Deepgram Nova-2
   - **System Prompt**: Use the comprehensive prompt provided

#### B. Google AI Setup

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Create an API key for Gemini
3. Add the key to your `.env.local` file

#### C. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Authentication** (Email/Password)
4. Enable **Firestore Database**
5. Create a service account:
   - Go to Project Settings → Service Accounts
   - Generate new private key
   - Download the JSON file
6. Extract the required values for your `.env.local`

### 5. Firebase Security Rules

Set up Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Users can read their own interviews
    match /interviews/{interviewId} {
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
      allow read: if request.auth != null && resource.data.finalized == true;
      allow write: if false; // Only server can write
    }

    // Users can read their own feedback
    match /feedback/{feedbackId} {
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
      allow write: if false; // Only server can write
    }
  }
}
```

### 6. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
interview-edge/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication pages
│   ├── (root)/                   # Main application pages
│   ├── api/                      # API routes
│   ├── interview/                # Interview pages
│   └── scorecard/                # Results pages
├── components/                   # React components
│   ├── ui/                       # UI components
│   └── Agent.tsx                 # Main VAPI integration
├── constants/                    # Application constants
├── firebase/                     # Firebase configuration
├── lib/                          # Utility functions and actions
├── public/                       # Static assets
├── types/                        # TypeScript type definitions
└── scripts/                      # Utility scripts
```

## 🔧 Configuration Details

### VAPI Assistant Configuration

Your VAPI assistant should be configured with:

- **Model**: OpenAI GPT-4 (recommended for best performance)
- **Temperature**: 0.7
- **Max Tokens**: 300
- **Silence Timeout**: 30 seconds
- **Max Duration**: 1800 seconds (30 minutes)
- **Voice**: 11Labs professional voice
- **Transcriber**: Deepgram Nova-2

### Interview Templates

The application includes pre-built templates for:

- **Frontend Developer** (Junior/Senior)
- **Backend Developer** (Mid/Senior)
- **Data Analyst** (Mid/Senior)
- **Data Scientist** (Senior)
- **DevOps Engineer** (Mid/Senior)
- **Full Stack Developer** (Senior)
- **Mobile Developer** (Mid/Senior)
- **QA Engineer** (Mid/Senior)
- **Product Manager** (Senior)

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add all environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The application can be deployed on any platform that supports Next.js:

- Netlify
- Railway
- AWS Amplify
- Google Cloud Platform

## 🔒 Security Considerations

- All API keys should be kept secure and never committed to version control
- Firebase security rules are configured to protect user data
- Server actions are used for secure database operations
- Authentication is required for all interview features

## 🐛 Troubleshooting

### Common Issues

1. **VAPI Call Fails**

   - Check your VAPI credentials
   - Ensure assistant is properly configured
   - Verify model is set to OpenAI (not Google)

2. **Firebase Connection Issues**

   - Verify all Firebase environment variables
   - Check Firestore security rules
   - Ensure service account has proper permissions

3. **Google AI API Errors**
   - Verify API key is correct
   - Check API quotas and billing
   - Ensure model name is correct (`gemini-1.5-pro`)

### Debug Mode

Enable debug logging by checking browser console for detailed error messages.

## 📝 Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Utility Scripts
npm run backup       # Backup Firestore data
npm run restore      # Restore from backup
npm run regenerate-feedback  # Regenerate missing feedback
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Review the console logs for error messages
3. Ensure all environment variables are correctly set
4. Verify all external services (VAPI, Firebase, Google AI) are properly configured

## 🔄 Updates

To update the project:

```bash
git pull origin main
npm install  # Install any new dependencies
npm run build  # Rebuild the project
```

---

**Happy Interviewing! 🎯**
