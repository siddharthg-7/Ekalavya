You are now responsible for correcting and establishing the COMPLETE
USER FLOW of the Ekalavya frontend.

IMPORTANT:

Do NOT redesign the UI.

Do NOT create new visual designs.

Do NOT add decorative components.

Do NOT create random dashboards.

Do NOT improve the landing page yet.

This task is ONLY about:

ROUTING
NAVIGATION
USER STATES
DEMO LOGIN FLOW
ROLE FLOW
PAGE TRANSITIONS
PROTECTED ROUTES
BACK NAVIGATION
SESSION STATE
ERROR/LOADING STATES
AND THE COMPLETE PRODUCT JOURNEY.

The visual design of each page will be implemented later,
one page at a time.

============================================================
PRODUCT
============================================================

Name:

Ekalavya

Tagline:

Learn Today. Serve Better.

Ekalavya is an AI-powered competency intelligence and
personalized learning platform.

The core learner journey is:

Official Profile
→ Competency Profile
→ Skill Gap Analysis
→ Personalized Learning
→ Adaptive Assessment
→ Assessment Result
→ Competency Improvement

The administrator journey is:

Admin Access
→ Organization Dashboard
→ Workforce Competency Gaps
→ Training Effectiveness
→ Skill Demand / Priorities
→ Official Detail

============================================================
SOURCE OF TRUTH
============================================================

The existing backend and project documentation are the source
of truth for available functionality.

DO NOT invent backend endpoints.

DO NOT invent API response fields.

DO NOT create fake authentication behavior that pretends to
be real government authentication.

Inspect the existing backend before connecting frontend routes.

If an endpoint does not exist, do not invent it.

Create a clean abstraction/place-holder until the actual endpoint
is available.

============================================================
IMPORTANT PROTOTYPE AUTHENTICATION MODEL
============================================================

This project is a prototype.

We need TWO access paths:

1. Normal Login
2. Demo Access

Normal Login:

/login

The UI can contain:

Official ID
Password
Sign In

But do not pretend this is connected to real government SSO
unless the backend actually supports it.

Demo Access:

The user can explicitly choose:

“Continue with Demo”

This routes to:

/demo

============================================================
DEMO FLOW
============================================================

/demo

Display:

“Explore Ekalavya Demo”

Role selection:

Government Official
Administrator

The user must select one role.

--------------------------------
IF GOVERNMENT OFFICIAL
--------------------------------

Fetch available synthetic officials from the backend if an
official-list endpoint exists.

Do not hard-code a fake list if the backend already provides it.

Display:

Name
Designation
Department

Example synthetic data may look like:

Dr. Ananya Sharma
Statistical Officer
Department of Statistics

But only use actual backend data when available.

User selects an official.

Store:

role = learner
officialId = selected official ID
mode = demo

Then route:

/learner

--------------------------------
IF ADMINISTRATOR
--------------------------------

Store:

role = admin
mode = demo

Then route:

/admin

============================================================
SESSION STATE
============================================================

Create one centralized frontend session/auth state.

Conceptually:

{
  mode: "demo" | "authenticated",
  role: "learner" | "admin",
  officialId?: string
}

Do not duplicate this state independently across pages.

Use a central state/context/store appropriate to the existing
project architecture.

The selected official ID must remain available while the learner
is navigating between learner pages.

If the user refreshes the page, preserve the demo session if
appropriate for the existing application architecture.

If no valid session exists, protected routes must redirect
appropriately.

============================================================
PUBLIC ROUTES
============================================================

/

Landing Page

/login

Login Page

/demo

Demo Access

/help

Help

/accessibility

Accessibility

============================================================
LEARNER ROUTES
============================================================

All learner routes require:

role = learner

and a valid officialId.

Routes:

/learner

Learner Dashboard

/learner/profile

Competency Profile

/learner/gaps

Skill Gap Analysis

/learner/learning

Personalized Learning

/learner/learning/:id

Learning Resource Detail

/learner/assessments

Assessments

/learner/assessments/new

Assessment Generation

/learner/assessments/:sessionId

Adaptive Assessment

/learner/assessments/:sessionId/result

Assessment Result

/learner/progress

Progress

============================================================
ADMIN ROUTES
============================================================

All admin routes require:

role = admin

Routes:

/admin

Admin Dashboard

/admin/competencies

Organization Competency Gaps

/admin/training

Training Effectiveness

/admin/demand

Skill Demand / Priorities

/admin/officials

Officials

/admin/officials/:id

Official Detail

============================================================
PROTECTED ROUTE RULES
============================================================

If a learner attempts to access:

/admin

redirect to:

/learner

If an administrator attempts to access:

/learner

redirect to:

/admin

If no session exists and the user tries to access a protected
route:

redirect to:

/login

Do not show broken or empty dashboards.

============================================================
LANDING → LOGIN FLOW
============================================================

/

Landing

Primary CTA:

Get Started

When clicked:

→ /login

The landing page must NOT directly bypass the login flow.

============================================================
LOGIN FLOW
============================================================

/login

Two possible actions:

Sign In

OR

Continue with Demo

If real authentication is not available:

Sign In should not fake a successful government login.

Instead show an appropriate prototype state or disabled/
not-configured message based on the actual backend capabilities.

Continue with Demo:

→ /demo

============================================================
DEMO ROLE FLOW
============================================================

/demo

Step 1:

Choose role.

If:

Government Official

→ select official

→ continue

→ /learner

If:

Administrator

→ continue

→ /admin

The transition must be clean and deterministic.

Do not allow the user to reach /learner without an officialId.

============================================================
LEARNER NAVIGATION
============================================================

Once inside /learner, the learner navigation must be consistent.

Navigation:

Dashboard
Competencies
Skill Gaps
Learning
Assessments
Progress

Clicking:

Dashboard
→ /learner

Competencies
→ /learner/profile

Skill Gaps
→ /learner/gaps

Learning
→ /learner/learning

Assessments
→ /learner/assessments

Progress
→ /learner/progress

The active navigation item must reflect the current route.

============================================================
LEARNER FLOW
============================================================

START:

/learner

Dashboard must eventually consume:

GET /officials/{id}/competency-gaps

and

GET /recommendations/{id}

when those endpoints are available.

The dashboard provides entry points to:

Competency Profile

Skill Gap Analysis

Recommended Learning

Assessments

Progress

------------------------------------------------------------
COMPETENCY PROFILE
------------------------------------------------------------

/learner/profile

Display the selected official's competency profile.

From here:

“View Skill Gaps”

→ /learner/gaps

------------------------------------------------------------
SKILL GAP ANALYSIS
------------------------------------------------------------

/learner/gaps

Display competency gaps.

From a gap:

“Find Learning”

→ /learner/learning

The selected gap/context should be preserved if needed so
the learning page can show why a resource was recommended.

------------------------------------------------------------
PERSONALIZED LEARNING
------------------------------------------------------------

/learner/learning

Display recommended learning resources.

Each recommendation should eventually be able to show:

Title
Domain
Level
Duration
Competency match
Why recommended

Clicking a resource:

→ /learner/learning/:id

The detail page may contain:

Start Learning
View Resource
Take Assessment

depending on actual backend functionality.

------------------------------------------------------------
ASSESSMENT FLOW
------------------------------------------------------------

/learner/assessments

Show available assessments and the option:

“Create Assessment”

→ /learner/assessments/new

------------------------------------------------------------
ASSESSMENT GENERATION
------------------------------------------------------------

/learner/assessments/new

User uploads PDF/PPT.

The frontend must eventually call:

POST /quiz/generate

with the required file and official ID.

The response provides:

session_id

After successful generation:

→ /learner/assessments/:sessionId

Do not create a fake session ID.

Use the actual backend response.

------------------------------------------------------------
ADAPTIVE ASSESSMENT
------------------------------------------------------------

/learner/assessments/:sessionId

IMPORTANT:

This is NOT a traditional quiz form.

Never display all questions at once.

The actual flow is:

GET /quiz/session/{id}/next

↓

Display ONE question

↓

User selects answer

↓

POST /quiz/session/answer

↓

Receive result/action

↓

Show:

Correct / Incorrect

Explanation

Adaptive feedback

↓

If action = remediate:

show a visible contextual message such as:

“Reinforcing: Sampling”

↓

Fetch the next question

↓

Repeat

until:

session_status = completed

This behavior is a core product requirement.

Do not replace it with a static 10-question form.

============================================================
ASSESSMENT RESULT
============================================================

When the assessment session is completed:

GET /quiz/session/{id}/summary

Then route:

/learner/assessments/:sessionId/result

Display:

Score

Concepts mastered

Concepts needing practice

Assessment summary

Recommended next action

The result screen should provide a clear path back to:

Learning

or

Dashboard

============================================================
COMPETENCY UPDATE
============================================================

After assessment completion, the learner dashboard/profile
should eventually reflect the updated competency state returned
by the backend.

Do not artificially animate a competency increase on the
frontend.

Do not invent score changes.

The backend is responsible for competency updates.

The UI only displays the resulting state.

============================================================
ADMIN FLOW
============================================================

/admin

Administrator dashboard.

Eventually consume:

GET /dashboard/admin

Display organization-level intelligence.

Navigation:

Dashboard
Competency Gaps
Training Effectiveness
Skill Demand
Officials

------------------------------------------------------------
ADMIN COMPETENCY GAPS
------------------------------------------------------------

/admin/competencies

Show organization-wide competency gaps.

Clicking an official or relevant item:

→ /admin/officials/:id

------------------------------------------------------------
TRAINING EFFECTIVENESS
------------------------------------------------------------

/admin/training

Show available training effectiveness information returned
by the backend.

Do not fabricate metrics.

------------------------------------------------------------
SKILL DEMAND
------------------------------------------------------------

/admin/demand

Show projected/priority competency information if the backend
supports it.

If unavailable, display a proper empty/not-configured state.

Do not create fake predictive data merely to fill the screen.

------------------------------------------------------------
OFFICIALS
------------------------------------------------------------

/admin/officials

List officials using actual backend data.

Click official:

→ /admin/officials/:id

------------------------------------------------------------
OFFICIAL DETAIL
------------------------------------------------------------

/admin/officials/:id

Show the selected official's competency information using
actual backend data.

Do not allow an invalid ID to produce a broken screen.

============================================================
BACK NAVIGATION
============================================================

Browser back navigation must work naturally.

Internal navigation must preserve the user's role/session.

Examples:

Dashboard
→ Skill Gaps
→ Learning
→ Back

must return to Skill Gaps.

Assessment:

Assessments
→ Generate
→ Quiz
→ Result

must preserve the assessment session.

Do not lose sessionId during navigation.

============================================================
LOGOUT / EXIT DEMO
============================================================

Provide a clean way to:

“Exit Demo”

or

“Sign Out”

When clicked:

Clear:

role
officialId
mode

Then:

→ /login

Do not leave protected session state behind.

============================================================
404 / INVALID ROUTES
============================================================

Create a clean:

404 Not Found

page.

Do not expose raw errors.

Provide:

“Return to Dashboard”

based on the current valid role,
or

“Return to Login”

if no session exists.

============================================================
LOADING STATES
============================================================

Every API-dependent page must have a loading state.

Examples:

Loading competency profile...

Loading skill gaps...

Finding learning recommendations...

Generating assessment...

Loading next question...

Updating your progress...

Do not freeze the interface.

============================================================
ERROR STATES
============================================================

Every API-dependent page must have a meaningful error state.

Examples:

Unable to load competency information.

Unable to load recommendations.

Assessment generation failed.

Unable to load the next question.

Unable to submit your answer.

Provide:

Retry

where appropriate.

Never display raw stack traces to the user.

============================================================
EMPTY STATES
============================================================

Create meaningful empty states.

Examples:

No competency gaps found.

No learning recommendations available.

No assessments yet.

No officials available.

Do not fill empty states with fake data.

============================================================
ASYNC AI STATES
============================================================

AI operations can take time.

The UI should distinguish:

normal loading

from

AI processing.

For example:

“Analysing your competency profile...”

“Generating personalized assessment...”

“Adapting your next question...”

Do not pretend AI completed instantly if the backend is processing.

============================================================
ROUTE GUARDS
============================================================

Implement route guards cleanly.

Public:

/
 /login
 /demo
 /help
 /accessibility

Learner protected:

/learner/*

Admin protected:

/admin/*

Unknown:

/404

Do not duplicate guard logic in every page.

============================================================
NO PAGE DESIGN YET
============================================================

This is extremely important.

At this stage:

DO NOT spend time making the pages beautiful.

Use simple temporary shells.

Example:

Learner Dashboard
“Design pending”

Competency Profile
“Design pending”

Skill Gap Analysis
“Design pending”

Learning
“Design pending”

Assessment
“Design pending”

Admin Dashboard
“Design pending”

The purpose of these shells is to verify that the flow works.

============================================================
FLOW TESTING
============================================================

After implementation, manually test this complete path:

TEST 1 — LEARNER

Landing
→ Login
→ Demo Access
→ Government Official
→ Select Official
→ Learner Dashboard
→ Competency Profile
→ Skill Gap Analysis
→ Learning
→ Assessments
→ Assessment Generation
→ Adaptive Assessment
→ Result
→ Dashboard

TEST 2 — ADMIN

Landing
→ Login
→ Demo Access
→ Administrator
→ Admin Dashboard
→ Competency Gaps
→ Training
→ Skill Demand
→ Officials
→ Official Detail

TEST 3 — PROTECTION

No session
→ /learner
→ redirect /login

Learner
→ /admin
→ redirect /learner

Admin
→ /learner
→ redirect /admin

TEST 4 — LOGOUT

Learner
→ Exit Demo
→ session cleared
→ /login

Then attempt:

/learner

Must redirect to /login.

TEST 5 — REFRESH

Select demo official
→ /learner
→ refresh

The session should remain valid if the selected demo state is
designed to persist.

============================================================
BACKEND VALIDATION
============================================================

Before connecting each real screen to an endpoint:

Inspect the backend route and response schema.

Do not guess.

The known adaptive quiz endpoints are conceptually:

POST /quiz/generate

GET /quiz/session/{id}/next

POST /quiz/session/answer

GET /quiz/session/{id}/summary

Use the actual implementation in the repository as the final
authority.

============================================================
IMPORTANT PRODUCT RULE
============================================================

The application must feel like ONE product.

Do not create independent mini-applications for:

Learner
Admin
Assessment

They share:

Ekalavya branding
design system
session architecture
navigation principles
API client
error handling
accessibility
responsive behavior

The visual design will be established later.

============================================================
FINAL CHECK
============================================================

Before stopping:

1. Verify all routes.
2. Verify route guards.
3. Verify demo login.
4. Verify learner role selection.
5. Verify admin role selection.
6. Verify session persistence.
7. Verify logout.
8. Verify browser back navigation.
9. Verify protected routes.
10. Verify invalid routes.
11. Verify loading states.
12. Verify error states.
13. Verify no fake API calls.
14. Verify no fake authentication claims.
15. Verify backend has not been modified unnecessarily.
16. Verify application builds successfully.

============================================================
STOP CONDITION
============================================================

STOP after the flow is working.

DO NOT start designing:

Landing Page
Login Page
Dashboard
Competency Profile
or any other page.

Report:

1. Final route tree.
2. Learner flow.
3. Admin flow.
4. Demo login flow.
5. Session/state mechanism.
6. Route protection mechanism.
7. API endpoints actually connected.
8. Tests performed.
9. Build status.
10. Any issues remaining.

Then WAIT for my next instruction.