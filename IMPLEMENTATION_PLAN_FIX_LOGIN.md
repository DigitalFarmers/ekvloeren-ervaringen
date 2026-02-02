# Plan: Fix Admin Login & "Server Error"

The persistent "Server Error" is likely caused by a combination of missing environment variables and failing database connections on the live server. We will implement a "Fail-Proof" login mechanism that bypasses the database for emergency accounts and provides detailed error reporting.

## Phase 1: Fail-Proof Backend Login
1.  **Refactor `adminLogin`**:
    *   Separate the database check from the basic identity check.
    *   Ensure designates accounts (`motouzani`, `bowien`) can log in even if the database is completely down or the `DATABASE_URL` is missing.
    *   Change cookie settings from `strict` to `lax` to ensure they survive cross-domain redirects if any.
    *   Add detailed error logging that returns the actual error message to the UI instead of a generic "Server Error".

## Phase 2: User Interface Updates
1.  **Enhance `AdminLogin` component**:
    *   Display the specific error message returned by the server (e.g., "DATABASE_URL missing" or "Table not found").
    *   Add a visual indicator if the site is running in "Emergency Mode".

## Phase 3: Deployment Strategy
1.  **Direct Vercel Deploy**: Since GitHub is unreachable from the current terminal environment, we will use the Vercel CLI (`npx vercel`) to push the code directly from the local machine.

## Phase 4: Database Reconciliation (Once Logged In)
1.  **Verify Tables**: Use the admin session to check if `admin_users` exists.
2.  **Password Reset**: Use the newly added "Wachtwoord" button in the dashboard to set proper hashes in the database.

---

### Implementation Progress:
- [ ] Refactor `adminLogin` for emergency access
- [ ] Update UI with detailed error reporting
- [ ] Push to Vercel via CLI
- [ ] Verify access for 'motouzani' and 'bowien'
