# Frontend Junior Assistant Setup

## What Was Done

I've configured your project to use a specific VAPI assistant (`898b325c-5f13-4bdf-a44d-12b21127781d`) for the **Frontend Developer (Junior Level)** interview template.

## Changes Made

### 1. Environment Variable Added (`.env.local`)

```env
NEXT_PUBLIC_VAPI_FRONTEND_JUNIOR_ASSISTANT_ID=898b325c-5f13-4bdf-a44d-12b21127781d
```

### 2. Type Definition Updated (`types/index.d.ts`)

Added `templateId` prop to `AgentProps`:

```typescript
interface AgentProps {
  userName: string;
  userId?: string;
  interviewId?: string;
  feedbackId?: string;
  type: "generate" | "interview";
  questions?: string[];
  templateId?: string; // ← New prop
}
```

### 3. Agent Component Updated (`components/Agent.tsx`)

- Accepts `templateId` prop
- Checks if `templateId === "frontend-junior"`
- Uses specific assistant for Frontend Junior interviews
- Falls back to main assistant for other templates

### 4. Template Page Updated (`app/interview/template/[templateId]/page.tsx`)

- Passes `templateId` to Agent component

## How It Works

### For Frontend Developer (Junior) Template:

```
User clicks "Take Interview" on Frontend Junior template
  ↓
templateId = "frontend-junior"
  ↓
Agent component detects templateId === "frontend-junior"
  ↓
Uses assistant: 898b325c-5f13-4bdf-a44d-12b21127781d
  ↓
Starts interview with Frontend Junior specific assistant
```

### For All Other Templates:

```
User clicks "Take Interview" on any other template
  ↓
templateId = "backend-mid", "data-analyst-senior", etc.
  ↓
Agent component uses default assistant
  ↓
Uses assistant: 75cb2fd1-b6da-4172-b056-849c6b76e205
  ↓
Starts interview with main assistant
```

## Testing

1. **Restart your dev server** (important!):

   ```bash
   npm run dev
   ```

2. **Test Frontend Junior template**:

   - Go to Frontend Developer (Junior) template
   - Click "Take Interview"
   - Check console logs:
     ```
     Template ID: frontend-junior
     Using Frontend Junior specific assistant
     Using assistant ID: 898b325c-5f13-4bdf-a44d-12b21127781d
     Is Frontend Junior assistant: true
     ```

3. **Test other templates**:
   - Go to any other template (Backend, Data Analyst, etc.)
   - Click "Take Interview"
   - Check console logs:
     ```
     Template ID: backend-mid (or other)
     Using assistant ID: 75cb2fd1-b6da-4172-b056-849c6b76e205
     Is Frontend Junior assistant: false
     ```

## Adding More Template-Specific Assistants

If you want to add specific assistants for other templates:

### Step 1: Add Environment Variable

```env
NEXT_PUBLIC_VAPI_BACKEND_MID_ASSISTANT_ID=your-assistant-id
NEXT_PUBLIC_VAPI_DATA_ANALYST_SENIOR_ASSISTANT_ID=your-assistant-id
```

### Step 2: Update Agent Component Logic

```typescript
// In components/Agent.tsx
let assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;

if (templateId === "frontend-junior") {
  const frontendJuniorAssistantId =
    process.env.NEXT_PUBLIC_VAPI_FRONTEND_JUNIOR_ASSISTANT_ID;
  if (frontendJuniorAssistantId) {
    assistantId = frontendJuniorAssistantId;
  }
} else if (templateId === "backend-mid") {
  const backendMidAssistantId =
    process.env.NEXT_PUBLIC_VAPI_BACKEND_MID_ASSISTANT_ID;
  if (backendMidAssistantId) {
    assistantId = backendMidAssistantId;
  }
} else if (templateId === "data-analyst-senior") {
  const dataAnalystSeniorAssistantId =
    process.env.NEXT_PUBLIC_VAPI_DATA_ANALYST_SENIOR_ASSISTANT_ID;
  if (dataAnalystSeniorAssistantId) {
    assistantId = dataAnalystSeniorAssistantId;
  }
}
```

### Step 3: Restart Dev Server

## Template IDs Reference

Check `constants/interview-templates.ts` for all template IDs:

- `frontend-junior` - Frontend Developer (Junior)
- `frontend-senior` - Frontend Developer (Senior)
- `backend-mid` - Backend Developer (Mid-level)
- `data-analyst-mid` - Data Analyst (Mid-level)
- `devops-mid` - DevOps Engineer (Mid-level)
- `fullstack-senior` - Full Stack Developer (Senior)
- `mobile-mid` - Mobile Developer (Mid-level)
- `qa-mid` - QA Engineer (Mid-level)
- `product-manager-senior` - Product Manager (Senior)
- `data-scientist-senior` - Data Scientist (Senior)

## Benefits

✅ **Customized Experience** - Each template can have its own specialized assistant
✅ **Better Interviews** - Assistants can be fine-tuned for specific roles
✅ **Flexible** - Easy to add more template-specific assistants
✅ **Fallback** - Always uses main assistant if specific one isn't configured
✅ **Scalable** - Can have different assistants for different experience levels

## Summary

- ✅ Frontend Junior template now uses: `898b325c-5f13-4bdf-a44d-12b21127781d`
- ✅ All other templates use: `75cb2fd1-b6da-4172-b056-849c6b76e205`
- ✅ Easy to add more template-specific assistants
- ✅ Automatic fallback to main assistant

Just restart your dev server and test it!
