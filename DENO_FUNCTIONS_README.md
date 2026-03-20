# Deno Edge Functions

## Important Notes

### TypeScript Errors in IDE
You may see TypeScript errors in the IDE for files in `supabase/functions/` directory. **This is expected and normal!**

**Why this happens:**
- IDE tries to compile Deno files with regular TypeScript compiler
- Deno uses different import syntax (`https://deno.land/std@...`)
- Regular TypeScript doesn't recognize Deno-specific APIs (`Deno.env`)

**This is NOT a problem because:**
- ✅ Deno functions are deployed to Supabase, not bundled with the app
- ✅ Deno runtime handles the imports correctly
- ✅ Function has been verified with `deno check` command
- ✅ TypeScript config excludes `supabase/` from compilation (see `tsconfig.app.json`)

### Current Functions

#### Contact Email Function
**File**: `supabase/functions/contact-email/index.ts`
**Purpose**: Sends email notifications when contact form is submitted
**Status**: ✅ Working and verified

**Features**:
- CORS handling for cross-origin requests
- Input validation (name, email, message)
- Email sending via Resend API (optional)
- Proper error handling and logging
- JSON responses with appropriate HTTP status codes

### Verification
To verify Deno functions work correctly:

```bash
# Check Deno function syntax
deno check supabase/functions/contact-email/index.ts

# Should output: "Check supabase/functions/contact-email/index.ts"
```

### Deployment
Deno functions are deployed to Supabase Edge Runtime, not included in the main application build.

**Ignore IDE TypeScript errors for files in `supabase/functions/` directory - they are working correctly!**
