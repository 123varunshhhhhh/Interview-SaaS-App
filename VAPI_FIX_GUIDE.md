# VAPI Call Cutoff Fix Guide

## Problem

Your calls are ending prematurely with "Meeting ended due to ejection" error because of incorrect timeout settings.

## Root Cause

The `endpointing: 255` setting in your transcriber means the call ends after just 0.255 seconds of silence - way too short!

## Solution

### Option 1: Fix in VAPI Dashboard (Easiest)

1. Go to https://vapi.ai/dashboard
2. Find your assistant: **Interview Question Generator** (ID: `75cb2fd1-b6da-4172-b056-849c6b76e205`)
3. Click **Edit**

#### Update Transcriber Settings:

- **Endpointing**: Change from `255` to `2500` (2.5 seconds)
- **Language**: Keep as `en`
- **Model**: Keep as `nova-2`

#### Update Stop Speaking Plan:

- **Number of words**: `2-3` (prevents interruption on single words)
- **Voice seconds**: `0.3-0.4` (how long user speaks before interrupting)
- **Back off seconds**: `1.0` (wait time before resuming)

#### Update Call Timeout Settings:

- **Silence Timeout**: `180` seconds (3 minutes of silence before ending)
- **Maximum Duration**: `1800` seconds (30 minutes max call length)

#### Update Idle Messages:

- **Idle Timeout**: `15-20` seconds (wait before saying idle message)
- **Max Idle Messages**: `3` (maximum times to prompt user)

4. Click **Save**

### Option 2: Create New Assistant

Use the `vapi-assistant-fixed.json` file I created:

1. Go to VAPI Dashboard
2. Click **Create Assistant**
3. Import the `vapi-assistant-fixed.json` file
4. Copy the new Assistant ID
5. Update `.env.local`:
   ```
   NEXT_PUBLIC_VAPI_ASSISTANT_ID=<new-assistant-id>
   ```

## Key Settings Explained

| Setting         | Old Value | New Value | Why                                   |
| --------------- | --------- | --------- | ------------------------------------- |
| Endpointing     | 255ms     | 2500ms    | Prevents premature call end           |
| Silence Timeout | Not set   | 180s      | Allows thinking time                  |
| Max Duration    | Not set   | 1800s     | Enough time for full interview        |
| Stop Words      | 0         | 2-3       | Prevents interruption on single words |
| Idle Timeout    | Not set   | 15-20s    | Gives user time to think              |

## Testing

After making changes:

1. Restart your Next.js dev server
2. Start a new call
3. Try pausing for 2-3 seconds between answers
4. The call should NOT end prematurely anymore

## Debugging

If issues persist, check browser console for:

- `📊 Messages count:` - Should show collected messages
- `📝 Generated transcript:` - Should show conversation
- Any VAPI error messages

The code now has better error handling and will show you exactly what's happening.
