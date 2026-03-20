# Contact Form Setup Guide

## Issue Identified
The contact form messages are not displaying in the admin panel because:

1. **Missing Environment Variables**: No `.env.local` file with Supabase credentials
2. **Database Table**: `contact_submissions` table might not exist
3. **Permissions**: RLS policies might not be configured correctly

## Quick Fix Steps

### 1. Set Up Environment Variables
Create a `.env.local` file in the project root:

```bash
# Copy the example file
cp .env.example .env.local
```

Then update `.env.local` with your actual Supabase credentials:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://cfydprogwkmahwlwgnwu.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmeWRwcm9nd2ttYWh3bHdnbnd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2NTYzNjgsImV4cCI6MjA4NzIzMjM2OH0.9OXlkdrV4yQGzo_LS7NTjjtekn_RCHH7W3G5iwhxFRo
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmeWRwcm9nd2ttYWh3bHdnbnd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2NTYzNjgsImV4cCI6MjA4NzIzMjM2OH0.9OXlkdrV4yQGzo_LS7NTjjtekn_RCHH7W3G5iwhxFRo

# Optional: For email notifications
RESEND_API_KEY=your-resend-api-key
```

### 2. Set Up Database Table
Run the SQL migration in your Supabase dashboard:

```sql
-- File: supabase/migrations/create_contact_submissions.sql
```

Or run this directly in Supabase SQL Editor:

```sql
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow insertions from anyone (contact form)
CREATE POLICY "Allow insertions" ON public.contact_submissions
  FOR INSERT WITH CHECK (true);

-- Allow admin users to read/delete data
CREATE POLICY "Allow admin operations" ON public.contact_submissions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon;
GRANT INSERT ON public.contact_submissions TO anon;
GRANT ALL ON public.contact_submissions TO authenticated;
```

### 3. Test the Connection
After setup, test the contact form:

1. Navigate to the contact page
2. Fill out the form and submit
3. Check the admin panel to see if messages appear
4. Check browser console for any errors

### 4. Debugging Steps
If messages still don't appear:

1. **Check Browser Console**: Look for Supabase connection errors
2. **Check Network Tab**: See if API calls are failing
3. **Verify Database**: Check if data is being saved in Supabase
4. **Check Permissions**: Ensure RLS policies are correct

## Files Modified
- ✅ `.gitignore` - Fixed to allow `.env.example`
- ✅ `src/components/Contact.tsx` - Added better error handling
- ✅ `src/pages/AdminMessagesTab.tsx` - Added error display and retry logic
- ✅ `supabase/migrations/create_contact_submissions.sql` - Database setup
- ✅ `src/utils/testConnection.ts` - Connection testing utility

## Expected Behavior After Fix
1. ✅ Contact form submissions are saved to database
2. ✅ Messages appear in admin panel immediately
3. ✅ Email notifications are sent (if RESEND_API_KEY is configured)
4. ✅ Error messages are displayed if something goes wrong
5. ✅ Real-time updates when new messages are submitted

## Common Issues & Solutions

### Issue: "Permission denied" errors
**Solution**: Run the SQL migration to set up proper RLS policies

### Issue: Messages save but don't appear in admin
**Solution**: Check if user has admin role in `user_roles` table

### Issue: Network errors in browser
**Solution**: Verify Supabase URL and keys in `.env.local`

### Issue: Edge function fails
**Solution**: Check if RESEND_API_KEY is set in Supabase Edge Function secrets
