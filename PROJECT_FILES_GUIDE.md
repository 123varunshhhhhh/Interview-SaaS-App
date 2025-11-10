# Important Project Files - Ordered by Priority

## 🔴 CRITICAL - Core Configuration (Must Have)

### 1. Environment & Configuration

```
.env.local                          # API keys, Firebase config, VAPI credentials
package.json                        # Dependencies and scripts
tsconfig.json                       # TypeScript configuration
next.config.ts                      # Next.js configuration
tailwind.config.js                  # Tailwind CSS configuration (if exists)
```

### 2. Firebase Setup

```
firebase/admin.ts                   # Firebase Admin SDK (server-side)
firebase/client.ts                  # Firebase Client SDK (client-side)
```

### 3. Core Constants

```
constants/index.ts                  # Core constants, interviewer config, schemas
constants/interview-templates.ts    # Interview templates for different roles
```

## 🟠 HIGH PRIORITY - Core Functionality

### 4. Main Components

```
components/Agent.tsx                # VAPI call handler (most important component!)
components/AuthForm.tsx             # Authentication form
components/InterviewCard.tsx        # Interview card display
components/InterviewTemplateCard.tsx # Template card display
components/DisplayTechIcons.tsx     # Tech stack icons
components/FormField.tsx            # Reusable form field
```

### 5. UI Components

```
components/ui/button.tsx            # Button component
components/ui/form.tsx              # Form component
components/ui/input.tsx             # Input component
components/ui/label.tsx             # Label component
components/ui/sonner.tsx            # Toast notifications
```

### 6. Core Actions (Server-side Logic)

```
lib/actions/auth.action.ts          # Authentication logic
lib/actions/general.action.ts       # Interview & feedback logic
```

### 7. Utilities

```
lib/utils.ts                        # Utility functions
lib/vapi.sdk.ts                     # VAPI SDK initialization
```

## 🟡 MEDIUM PRIORITY - Pages & Routes

### 8. App Layout & Root

```
app/layout.tsx                      # Root layout
app/globals.css                     # Global styles
app/favicon.ico                     # Favicon
```

### 9. Authentication Pages

```
app/(auth)/layout.tsx               # Auth layout
app/(auth)/sign-in/page.tsx         # Sign in page
app/(auth)/sign-up/page.tsx         # Sign up page
```

### 10. Main Pages

```
app/(root)/page.tsx                 # Home page
app/(root)/layout.tsx               # Main layout
app/(root)/create-interview/page.tsx # Create interview page
app/(root)/interview/[id]/page.tsx  # Interview details page (if exists)
```

### 11. Interview Pages

```
app/interview/template/[templateId]/page.tsx  # Template interview page
app/scorecard/page.tsx              # Scorecard display page
```

### 12. API Routes

```
app/api/generate-scorecard/route.ts # Generate scorecard API
app/api/create-interview/route.ts   # Create interview API (if exists)
app/api/vapi/route.ts               # VAPI webhook (if exists)
```

## 🟢 LOW PRIORITY - Types & Documentation

### 13. TypeScript Types

```
types/index.d.ts                    # Global type definitions
types/vapi.d.ts                     # VAPI type definitions
```

### 14. Documentation Files (Reference Only)

```
README.md                           # Project documentation
UPDATE_MAIN_ASSISTANT.md            # Assistant setup guide
FIREBASE_FEEDBACK_RECOVERY.md       # Firebase recovery guide
FIX_GOOGLE_503_ERROR.md             # Google 503 error fix
```

### 15. Backup Scripts (Optional)

```
scripts/backup-firestore.ts         # Backup Firestore data
scripts/restore-firestore.ts        # Restore Firestore data
scripts/regenerate-feedback.ts      # Regenerate feedback
```

## ⚪ IGNORE - Generated/Temporary Files

### Files to Ignore

```
.next/                              # Next.js build output
node_modules/                       # Dependencies
.git/                               # Git repository
backups/                            # Backup files
*.log                               # Log files
.DS_Store                           # Mac system files
```

## 📋 Quick Reference by Feature

### Authentication Feature

1. `firebase/client.ts` - Firebase auth setup
2. `lib/actions/auth.action.ts` - Auth logic
3. `components/AuthForm.tsx` - Auth UI
4. `app/(auth)/sign-in/page.tsx` - Sign in page
5. `app/(auth)/sign-up/page.tsx` - Sign up page

### Interview Feature

1. `components/Agent.tsx` - VAPI call handler
2. `constants/interview-templates.ts` - Templates
3. `app/interview/template/[templateId]/page.tsx` - Interview page
4. `lib/actions/general.action.ts` - Interview logic
5. `app/scorecard/page.tsx` - Results page

### VAPI Integration

1. `.env.local` - VAPI credentials
2. `lib/vapi.sdk.ts` - VAPI SDK
3. `components/Agent.tsx` - Call handling
4. `constants/index.ts` - Interviewer config
5. `types/vapi.d.ts` - VAPI types

### Firebase Integration

1. `.env.local` - Firebase credentials
2. `firebase/admin.ts` - Server-side Firebase
3. `firebase/client.ts` - Client-side Firebase
4. `lib/actions/general.action.ts` - Firestore operations

### Styling

1. `app/globals.css` - Global styles
2. `tailwind.config.js` - Tailwind config
3. `components/ui/*` - UI components

## 🎯 Files You'll Edit Most Often

### For Development:

1. **`components/Agent.tsx`** - VAPI call logic
2. **`constants/interview-templates.ts`** - Add/edit templates
3. **`app/(root)/page.tsx`** - Home page content
4. **`lib/actions/general.action.ts`** - Business logic
5. **`.env.local`** - Configuration

### For Styling:

1. **`app/globals.css`** - Global styles
2. **`components/ui/*`** - Component styles
3. **`tailwind.config.js`** - Tailwind customization

### For Content:

1. **`constants/interview-templates.ts`** - Interview questions
2. **`app/(root)/page.tsx`** - Home page
3. **`app/scorecard/page.tsx`** - Scorecard display

## 📦 Deployment Checklist

### Must Include:

- ✅ All files in `app/` directory
- ✅ All files in `components/` directory
- ✅ All files in `lib/` directory
- ✅ All files in `constants/` directory
- ✅ All files in `firebase/` directory
- ✅ All files in `types/` directory
- ✅ All files in `public/` directory
- ✅ `.env.local` (with production values)
- ✅ `package.json`
- ✅ `tsconfig.json`
- ✅ `next.config.ts`

### Can Exclude:

- ❌ `.next/` directory
- ❌ `node_modules/` directory
- ❌ `backups/` directory
- ❌ All `.md` documentation files
- ❌ `scripts/` directory (optional)
- ❌ `.git/` directory

## 🔍 File Count Summary

- **Critical Files:** ~15 files
- **High Priority:** ~20 files
- **Medium Priority:** ~15 files
- **Low Priority:** ~10 files
- **Total Important Files:** ~60 files

Out of thousands of files in the project, only about 60 are actually important for your application to work!
