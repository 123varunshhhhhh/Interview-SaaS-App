# VAPI Workflow Setup Guide

## Step 1: Create Interview Generation Workflow

1. **Login to VAPI Dashboard**

   - Go to https://vapi.ai
   - Navigate to "Workflows" section

2. **Create New Workflow**

   - Click "Create Workflow"
   - Name: "Interview Question Generator"
   - Description: "Generates interview questions based on user input"

3. **Workflow Configuration**

   ```json
   {
     "name": "Interview Question Generator",
     "firstMessage": "Hi! I'm here to help you prepare for your interview. Let me ask you a few questions to create personalized interview questions for you.",
     "voice": {
       "provider": "11labs",
       "voiceId": "sarah"
     },
     "model": {
       "provider": "openai",
       "model": "gpt-3.5-turbo",
       "messages": [
         {
           "role": "system",
           "content": "You are an interview preparation assistant. Your job is to collect information from the user to generate relevant interview questions. Ask about: 1) Job role they're applying for, 2) Experience level (Junior/Mid/Senior), 3) Tech stack/skills, 4) Interview type preference (Technical/Behavioral/Mixed). Keep questions conversational and collect one piece of info at a time. Once you have all info, confirm and end the call."
         }
       ]
     },
     "transcriber": {
       "provider": "deepgram",
       "model": "nova-2"
     }
   }
   ```

4. **Add Variables**

   - `username`: User's name
   - `userid`: User's ID from your app

5. **Save and Get Workflow ID**
   - Copy the workflow ID
   - Update your .env.local file

## Step 2: Test the Workflow

1. Use the VAPI dashboard to test your workflow
2. Make sure it collects all required information
3. Verify the conversation flow works properly

## Step 3: Update Your App

Replace the workflow ID in your .env.local:

```
NEXT_PUBLIC_VAPI_WORKFLOW_ID=your_actual_workflow_id
```
