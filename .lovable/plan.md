

## Plan: Add Forgot Password Flow for Admin

### What will be built
1. **"Forgot password?" link** on the Admin Login page (below the password field)
2. **Forgot Password page** (`/admin/forgot-password`) — enter email to receive a reset link
3. **Reset Password page** (`/admin/reset-password`) — set a new password after clicking the email link

### Changes

**1. `src/pages/AdminLogin.tsx`**
- Add a "Forgot password?" link between the password field and the Sign In button, linking to `/admin/forgot-password`

**2. New file: `src/pages/AdminForgotPassword.tsx`**
- Simple card UI matching the login page style (back arrow, card layout)
- Email input with validation
- Rate limiting (reuse existing `checkRateLimit`)
- Calls `supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + '/admin/reset-password' })`
- Shows success toast regardless of whether email exists (prevents user enumeration)

**3. New file: `src/pages/AdminResetPassword.tsx`**
- Detects `type=recovery` from URL hash (Supabase appends this)
- Shows new password + confirm password form
- Calls `supabase.auth.updateUser({ password })` to set new password
- On success, redirects to `/admin/login`
- If no recovery token in URL, shows error and link back to login

**4. `src/App.tsx`**
- Add routes: `/admin/forgot-password` and `/admin/reset-password`

### No database changes required
Password reset is handled entirely by the built-in authentication system.

