EKALAVYA — WEBSITE-WIDE DESIGN SYSTEM + UI/UX TRANSFORMATION

IMPORTANT:

This is a GLOBAL DESIGN SYSTEM task.

Do NOT redesign each page independently.

Transform the ENTIRE existing Ekalavya application into one coherent, modern, professional, highly usable product.

The existing application already contains multiple screens and functional flows.

Preserve the functionality.

Preserve the information architecture where it already makes sense.

Preserve the Ekalavya brand.

But establish ONE unified visual system across the entire product.

The result should feel like a real production-grade competency intelligence platform.

NOT:

- AI-generated SaaS
- generic dashboard template
- old government portal
- hackathon prototype
- Dribbble concept with unusable UI
- over-designed "AI" product
- futuristic cyberpunk interface

Instead:

MODERN
CALM
INTELLIGENT
PRECISE
HUMAN
PROFESSIONAL
ACCESSIBLE
VISUAL
DATA-DRIVEN
PUBLIC-SECTOR READY

============================================================
0. THE CORE DESIGN IDEA
============================================================

Ekalavya is not simply a learning portal.

It is a:

COMPETENCY INTELLIGENCE PLATFORM.

Every screen should communicate some part of this loop:

UNDERSTAND
↓
IDENTIFY
↓
LEARN
↓
ASSESS
↓
IMPROVE

This should become the underlying design language of the entire application.

The UI should help users answer:

Where am I?

What am I good at?

Where am I falling short?

What should I do next?

What have I improved?

============================================================
1. GLOBAL DESIGN PRINCIPLES
============================================================

Apply these principles to EVERY PAGE.

RULE 1:

If an element does not help the user understand, decide, navigate, or act:

REMOVE IT.

RULE 2:

Whitespace is part of the design.

Do not fill empty space just because it exists.

RULE 3:

If everything is emphasized, nothing is emphasized.

Every page should have:

ONE PRIMARY FOCUS

and at most:

ONE SECONDARY FOCUS.

RULE 4:

Do not use cards for everything.

Use:

open layouts
sections
lists
dividers
charts
panels
cards
typography

as different levels of structure.

RULE 5:

Color has meaning.

Do not use color merely to make the UI "pretty."

RULE 6:

Animation must communicate something.

Never animate an element just because Motion exists.

RULE 7:

Simple labels beat clever labels.

Use:

View
Open
Start
Continue
Save
Review
Explore
Back
Next
Submit
Sign in

NOT:

Unlock your journey
Explore your intelligence
Activate your growth
Discover your potential

Keep buttons extremely simple.

============================================================
2. BRAND
============================================================

KEEP THE EXISTING EKALAVYA LOGO.

Do NOT redesign it.

Do NOT replace it.

Do NOT add another symbol.

Do NOT introduce hackathon branding.

Do NOT mention:

SIH
Smart India Hackathon
Hackathon

anywhere in the public product UI.

Product:

Ekalavya

Tagline where appropriate:

Learn Today. Serve Better.

============================================================
3. GLOBAL COLOR SYSTEM
============================================================

Use ONLY the Ekalavya design palette.

Deep Navy:

#102A43

Dark Navy:

#08233D

Intelligence Blue:

#2563D9

Growth Green:

#16845B

Saffron:

#E8871A

Light Blue:

#8CCBFF

Background:

#F7F9FC

White:

#FFFFFF

Primary text:

#102A43

Secondary text:

#52657A

Border:

#DCE3EA

Muted background:

#EEF3F7

============================================================
4. COLOR SEMANTICS
============================================================

NAVY:

trust
structure
institutional identity

BLUE:

interaction
competency
primary action
information

GREEN:

growth
improvement
completed
positive progress

SAFFRON:

attention
skill gap
benchmark
important warning

RED:

errors only

Do NOT introduce purple as an "AI color."

Do NOT introduce neon.

Do NOT use rainbow gradients.

Do NOT randomly assign colors.

============================================================
5. TYPOGRAPHY
============================================================

Use:

Noto Sans.

Create a consistent type scale.

Display:

44–56px

Page title:

32–40px

Section title:

24–30px

Subsection:

18–20px

Body:

14–16px

Secondary:

12–14px

Metadata:

11–12px

Do not make every heading bold.

Use weight and spacing for hierarchy.

Avoid excessive uppercase.

Use uppercase primarily for:

eyebrows
statuses
small metadata
section labels

Major headings should remain sentence case.

Examples:

Your Competency Profile

Priority Gaps

Your next best learning moves

Progress over time

NOT:

YOUR COMPETENCY PROFILE

PRIORITY GAPS

YOUR NEXT BEST LEARNING MOVES

everywhere.

============================================================
6. COMPONENT FOUNDATION
============================================================

Before creating new UI components:

INSPECT THE EXISTING CODEBASE.

Determine whether the project already uses:

shadcn/ui
Base UI
Radix
Tailwind
Motion
Bklit
another component system

DO NOT replace an existing stable component system unnecessarily.

If shadcn is already present:

continue using it.

If Base UI is already used:

keep it.

If Radix is already used:

keep it.

Do not perform a library migration simply for aesthetics.

Use open-source component systems where they provide real value.

Preferred foundation:

shadcn/ui
+
Base UI or Radix primitives
+
Motion for React
+
Bklit UI for charts

============================================================
7. SHADCN / BASE UI / RADIX
============================================================

Use accessible primitives for:

Button
Input
Select
Tabs
Dialog
Dropdown
Popover
Tooltip
Accordion
Checkbox
Radio
Switch
Navigation
Command menu
Toast
Sheet
Calendar

Use them as building blocks.

Do not use the default visual appearance blindly.

Restyle them to match Ekalavya.

The component library should provide behavior and accessibility.

Ekalavya design tokens should provide visual identity.

============================================================
8. BKLIT — DATA VISUALIZATION
============================================================

Use Bklit UI for data visualization.

https://bklit.com/

Documentation:

https://bklit.com/docs

Use Bklit where charts genuinely improve understanding.

Preferred:

Radar
Line
Area
Bar
Gauge
Ring
Heatmap
Scatter

Do NOT use every chart type.

Choose the visualization based on the question.

Examples:

Competency comparison
→ Radar

Progress over time
→ Line

Skill-gap ranking
→ Horizontal Bar

Assessment readiness
→ Ring / Gauge

Department comparison
→ Bar

Competency distribution
→ Heatmap

Relationship between variables
→ Scatter

Bklit should be the visualization engine.

Ekalavya remains the visual system.

Do not make the application look like a Bklit demo.

============================================================
9. CHART DESIGN
============================================================

All charts must use Ekalavya colors.

Charts should be:

minimal
clean
precise
interactive
readable

Avoid:

3D charts
pie chart overload
unnecessary gradients
thick grid lines
giant legends
visual clutter

Use subtle grids.

Use tooltips.

Use meaningful labels.

Use animation only when it improves comprehension.

Do not fabricate data.

If data does not exist:

create an elegant empty state.

============================================================
10. MOTION SYSTEM
============================================================

Use Motion for React.

https://motion.dev/docs/react

Motion should be the global interaction language.

Use:

page transitions
section reveals
navigation transitions
hover states
button microinteractions
chart reveals
list stagger
modal transitions
drawer transitions
tab transitions

But:

DO NOT animate everything.

Recommended:

microinteraction:
150–250ms

standard UI transition:
200–350ms

section reveal:
400–650ms

major visualization reveal:
600–1000ms

Use spring physics only where it feels natural.

Respect:

prefers-reduced-motion.

When reduced motion is enabled:

remove decorative movement.

Keep essential state transitions.

============================================================
11. GLOBAL MOTION LANGUAGE
============================================================

Ekalavya motion should feel:

PRECISE
QUIET
INTENTIONAL

NOT:

bouncy
playful
dramatic
game-like

Examples:

Button arrow:

move 3px.

Tab:

indicator slides.

Chart:

draws once.

Card:

subtle elevation.

Page:

small fade + vertical movement.

Never:

floating cards
parallax everywhere
particle systems
cursor-following effects
bouncing buttons
spinning icons
excessive springs

============================================================
12. GLOBAL LAYOUT
============================================================

Use a consistent max-width.

Desktop:

approximately 1280–1440px depending on screen.

Content should not touch viewport edges.

Use a consistent spacing system:

4
8
12
16
20
24
32
40
48
64
80

Do not randomly use:

17px
23px
37px
51px

unless necessary.

Create reusable spacing tokens.

============================================================
13. RESPONSIVE DESIGN
============================================================

Do NOT treat mobile as:

"desktop but smaller."

Every major page must be intentionally responsive.

Desktop:

multi-column
full navigation
large charts

Tablet:

simplified columns
reduced navigation

Mobile:

priority-based content
compact header
stacked actions
readable charts
simplified navigation

Do not let important information disappear.

Do not horizontally overflow accidentally.

============================================================
14. GLOBAL NAVIGATION
============================================================

Create one consistent application navigation system.

Desktop:

Ekalavya logo
role badge
Dashboard
Competencies
Skill Gaps
Learning
Assessments
Progress

Right:

profile
help/accessibility where relevant
Exit Demo if in demo mode

Do not change navigation style on every page.

Active state should be consistent.

Use Motion for the active indicator.

Mobile:

use a compact navigation system.

Potentially:

menu/sheet
or bottom navigation

depending on the page.

Keep it simple.

============================================================
15. BUTTON LANGUAGE
============================================================

This is IMPORTANT.

Buttons must use extremely simple language.

Preferred:

Sign In

Explore Demo

Continue

Start

View

Review

Open

Learn

Practice

Assess

Save

Cancel

Back

Next

Submit

Try Again

See All

Continue Learning

Launch Assessment

Analyze Gaps

Avoid:

"Unlock Your Potential"

"Begin Your Transformational Journey"

"Discover Your Intelligence"

"Activate Personalized Growth"

"Experience AI-Powered Learning"

"Take Control of Your Future"

No marketing language inside application controls.

============================================================
16. FORMS
============================================================

All forms should share the same system.

Inputs:

48–52px height.

Border:

#DCE3EA

Radius:

8–10px.

Focus:

#2563D9

Labels:

clear

Errors:

direct

Example:

"Enter your official email."

NOT:

"Please provide your credentials to unlock access."

Forms should feel professional.

============================================================
17. TABLES
============================================================

Do not use generic spreadsheet-looking tables everywhere.

Use:

clear column hierarchy
subtle row separators
compact metadata
hover states
status indicators
simple filters

Actions should be:

View
Review
Edit
Open

Use pagination where necessary.

For mobile:

convert tables intelligently into stacked rows/cards.

============================================================
18. EMPTY STATES
============================================================

Empty states are part of the product.

Never show:

"No data."

Instead explain:

what belongs here
why it is empty
what the user can do

Example:

Progress over time

"Your competency trajectory will appear here after you complete your first assessment."

Button:

Start Assessment

Simple.

No giant illustration.

============================================================
19. LOADING STATES
============================================================

Use skeletons where useful.

Do not create fake content during loading.

Skeletons should match the actual final layout.

Use subtle shimmer.

Avoid huge spinners.

For charts:

use a compact chart loading state.

============================================================
20. ERROR STATES
============================================================

Errors must be human.

Example:

"Something went wrong."

"Try again."

Do not expose technical errors to users.

For authentication:

"Your sign-in details could not be verified."

Button:

Try Again

============================================================
21. TOOLTIPS
============================================================

Use tooltips for:

icons without labels
complex metrics
chart points
secondary controls

Do not use tooltips for basic actions that should already have visible labels.

============================================================
22. ICON SYSTEM
============================================================

Use ONE consistent icon family.

Prefer:

Lucide icons

or the existing icon system.

Do not mix:

Lucide
Font Awesome
random SVGs
emoji
different icon packs

Icons should be:

16–20px

mostly stroke-based.

Avoid decorative icons that don't communicate meaning.

============================================================
23. CARD SYSTEM
============================================================

This is critical.

STOP USING CARDS FOR EVERYTHING.

Use cards only when content needs containment.

Use:

open editorial sections
lists
dividers
charts
panels
cards

as different structures.

Card:

subtle border
minimal shadow
moderate radius

No giant floating shadows.

No excessive glass.

No nested cards.

Avoid:

card inside card inside card.

============================================================
24. SHADOWS
============================================================

Default:

NO SHADOW.

Use borders and background contrast.

Use a subtle shadow only for:

dropdown
modal
popover
floating menu
elevated interactive element

Do not make every card float.

============================================================
25. BORDER RADIUS
============================================================

Use restrained radii.

Small:

6–8px

Controls:

8–10px

Panels:

12–16px

Do not use:

24px
32px
40px

everywhere.

The interface should feel mature.

============================================================
26. DATA DENSITY
============================================================

Ekalavya is an intelligence platform.

Do not make it visually empty.

But do not overload it.

Use:

large visualizations
small metadata
clear hierarchy
short descriptions

Information should be dense where useful.

Whitespace should separate concepts.

============================================================
27. PAGE-SPECIFIC VISUAL SYSTEM
============================================================

Every page should have a different PRIMARY VISUAL.

LOGIN:

identity + architectural Lottie

DEMO:

two perspectives + miniature experience previews

DASHBOARD:

competency radar + priority gaps

COMPETENCIES:

competency exploration + detailed visualization

SKILL GAPS:

ranked deficits + recommended actions

LEARNING:

learning pathway + course/content progression

ASSESSMENTS:

adaptive assessment experience

PROGRESS:

longitudinal competency improvement

ADMIN:

organization-wide competency intelligence

Do not make every page:

title
subtitle
four cards.

============================================================
28. COMPETENCIES PAGE
============================================================

Design this as an exploration interface.

Primary visual:

competency map / radar / category visualization.

Allow users to:

search
filter
select competency
inspect current level
inspect expected level
see gap
see related learning

Do not overwhelm the user with every competency at once.

Progressively reveal detail.

============================================================
29. SKILL GAPS PAGE
============================================================

This page should answer:

"What should I improve first?"

Use:

ranked gaps
severity
current vs expected
recommended learning
priority

Prefer:

horizontal bars
ranked lists
small visual indicators

rather than dozens of cards.

Primary CTA:

View Learning

============================================================
30. LEARNING PAGE
============================================================

This page should answer:

"What should I learn next?"

Create a clean learning pathway.

Use:

Recommended
In Progress
Completed

Keep course cards simple.

Every course should communicate:

title
source
duration if available
competency
progress

Simple button:

Open

or:

Continue

Do not write:

"Embark on your personalized learning journey."

============================================================
31. ASSESSMENTS PAGE
============================================================

The assessment experience should feel focused.

Before assessment:

What you'll assess
Estimated time
Competencies covered
Start

During assessment:

one question at a time where appropriate
clear progress
minimal distractions

After assessment:

score
competency impact
identified gaps
next recommendation

Do not make the assessment screen look like a dashboard.

============================================================
32. PROGRESS PAGE
============================================================

This should feel reflective.

Show:

progress over time
competency changes
assessment milestones
learning activity

Use Bklit Line / Area charts.

Allow useful filtering:

30 days
90 days
6 months
1 year

ONLY if the underlying data supports it.

============================================================
33. ADMINISTRATOR EXPERIENCE
============================================================

Administrators should see:

organization
departments
competencies
skill gaps
learning adoption
assessment outcomes

The admin experience should use the same design system.

But the visual priority changes:

organization-level intelligence first.

Use:

bar charts
heatmaps
rankings
trend lines

Avoid generic CRM-like dashboards.

============================================================
34. DEMO MODE
============================================================

Demo mode must feel intentional.

Do not make it look like a prototype.

Use a small:

DEMO

indicator.

Keep:

Exit Demo

simple.

Do not write:

"PROTOTYPE ACCESS."

The user should feel like they are exploring a real product.

============================================================
35. GOVERNMENT VISUAL LANGUAGE
============================================================

Use institutional cues subtly.

Do NOT copy existing government websites.

Do NOT use:

government seals
fake official logos
flags everywhere
monument illustrations
old portal layouts

Instead use:

precision
measurement
architectural linework
structured typography
formal information hierarchy

The government Lottie used on authentication can become a subtle recurring motif.

============================================================
36. VISUALIZATION LANGUAGE
============================================================

Charts should feel like part of Ekalavya.

Use:

Blue:
current competency

Saffron:
benchmark / gap

Green:
improvement

Navy:
context

Neutral:
supporting data

No rainbow charts.

No unnecessary gradients.

No 3D.

No chart decoration.

============================================================
37. MICRO DETAILS
============================================================

Use subtle premium details.

Examples:

small status dots

tiny section numbers

fine divider lines

animated arrows

small benchmark labels

compact metadata

hover highlights

small progress indicators

But:

DO NOT sprinkle these everywhere.

One or two details per section is enough.

============================================================
38. VISUAL HIERARCHY TEST
============================================================

Every page must pass:

3 SECOND TEST.

Ask:

What is this page?

What is the most important thing?

What should I do next?

If those answers are not immediately obvious:

REDESIGN THE HIERARCHY.

============================================================
39. AI-SLOP TEST
============================================================

After implementing every page, perform this test:

Remove every decorative gradient.

Remove every decorative icon.

Remove every unnecessary rounded container.

Remove every unnecessary animation.

Remove every unnecessary sentence.

If the interface becomes BETTER:

the removed element was unnecessary.

Repeat until the interface feels inevitable.

============================================================
40. "AI SLOP" RED FLAGS
============================================================

NEVER use:

purple-blue AI gradients

huge glowing blobs

glassmorphism everywhere

floating 3D cards

random abstract AI illustrations

excessive rounded rectangles

giant gradient headings

"AI-powered" repeated everywhere

fake statistics

fake testimonials

fake government partnerships

fake certifications

excessive badges

emoji in professional UI

random decorative charts

charts without data

long CTA labels

marketing copy inside application controls

============================================================
41. COPY SYSTEM
============================================================

UI copy should be:

short
direct
human
professional

Instead of:

"Explore your personalized competency intelligence dashboard"

use:

"Your competencies"

Instead of:

"Discover personalized learning opportunities"

use:

"Recommended learning"

Instead of:

"Unlock deeper organizational insights"

use:

"View insights"

Instead of:

"Begin your adaptive assessment journey"

use:

"Start assessment"

Instead of:

"Explore the full spectrum of your capabilities"

use:

"View all competencies"

============================================================
42. DESIGN SYSTEM TOKENS
============================================================

Create or consolidate global tokens for:

colors
spacing
radius
typography
shadows
transitions
breakpoints

Do not hardcode these repeatedly.

The entire website should be controlled by one visual system.

============================================================
43. COMPONENT REUSE
============================================================

Create reusable components for:

AppHeader
PageHeader
SectionHeader
Button
IconButton
StatusBadge
Metric
MetricRow
DataPanel
ChartPanel
EmptyState
LoadingState
ErrorState
Tabs
Filter
Search
DataTable
ProgressIndicator
SkillGapRow
CompetencyRow
LearningStep
AssessmentStatus
Tooltip
Modal
Drawer

Do not duplicate similar components across pages.

============================================================
44. COMPONENT VARIANTS
============================================================

Components should have intentional variants.

Example:

Button:

primary
secondary
ghost
danger

Status:

success
warning
error
neutral

Panel:

default
dark
interactive

Do not create 30 visually different button styles.

Consistency matters.

============================================================
45. ACCESSIBILITY
============================================================

Treat accessibility as part of the design.

Implement:

keyboard navigation
visible focus
semantic HTML
ARIA where necessary
screen-reader labels
sufficient contrast
reduced motion
accessible chart descriptions
accessible forms

Never communicate important information through color alone.

Example:

"25 pt gap"

NOT merely:

orange badge.

============================================================
46. PERFORMANCE
============================================================

Do not sacrifice performance for visual effects.

Avoid:

continuous animation
large unnecessary libraries
duplicate chart libraries
huge image assets
unnecessary rerenders

Lazy load heavy visualization sections where appropriate.

============================================================
47. PAGE TRANSITIONS
============================================================

Use a consistent page transition system.

Route change:

current content exits subtly.

New content:

fades + moves upward slightly.

Duration:

200–350ms.

Do not create cinematic transitions.

The transition should almost feel invisible.

============================================================
48. LANDING PAGE
============================================================

The landing page should remain more editorial and visual than the application.

Hero:

strong message
Ekalavya identity
product preview
clear CTA

Use:

Get Started

NOT:

Start Your Transformation

Features:

use visual storytelling.

How it works:

simple.

CTA:

Get Started

Keep the landing page consistent with the application design system.

============================================================
49. LOGIN PAGE
============================================================

Maintain the established split-screen design.

Left:

Ekalavya identity
Build the skills that matter.
Understand → Identify → Learn → Improve
Government architectural Lottie

Right:

Welcome back.
Official / Administrator
Sign In
Explore Demo

Keep it calm.

============================================================
50. DEMO PAGE
============================================================

Maintain:

Explore Ekalavya Demo

Two experiences:

Government Official
Administrator

But make them feel like two lenses into the same platform.

Use visual previews.

Buttons:

Enter as Official

Organization View

Keep labels short.

============================================================
51. DASHBOARD
============================================================

Use the current refined dashboard structure.

Primary visual:

Competency Profile

Secondary:

Priority Gaps

Then:

Next Best Learning Moves

Then:

Adaptive Assessment

Then:

Progress

Use Bklit charts.

Keep the radar ↔ priority gap interaction.

============================================================
52. NO DESIGN DRIFT
============================================================

After redesigning every page:

compare all pages side-by-side.

Check:

same typography
same buttons
same borders
same radii
same icon family
same spacing
same chart language
same navigation
same motion language

Different page does NOT mean different design system.

============================================================
53. FINAL "CASE STUDY" QUALITY
============================================================

The website should be visually interesting enough that a UI/UX reviewer can identify:

clear design system
consistent components
information hierarchy
accessibility
responsive design
data visualization
interaction design
motion design
content hierarchy
real-world usability

The goal is NOT:

"look how many effects we added."

The goal is:

"every decision feels intentional."

============================================================
54. FINAL REVIEW PROCESS
============================================================

After implementation:

Open every major route.

Review at:

1440px
1280px
1024px
768px
390px

Check:

layout
spacing
typography
navigation
forms
buttons
charts
loading
errors
empty states
hover
keyboard
mobile
reduced motion

Then perform a visual cleanup pass.

REMOVE anything that feels:

generic
duplicated
decorative
unnecessary
overwritten
AI-generated
template-like

============================================================
55. FINAL CREATIVE STANDARD
============================================================

Do NOT try to make Ekalavya "futuristic."

Make it:

CURRENT.

Do NOT try to make it "luxurious."

Make it:

PRECISE.

Do NOT try to make it "AI-looking."

Make it:

INTELLIGENT.

Do NOT try to make it "government-looking."

Make it:

TRUSTWORTHY.

Do NOT try to make every page visually spectacular.

Make the entire system:

COHERENT.

============================================================
FINAL STATEMENT
============================================================

Build Ekalavya as a modern competency intelligence product.

The visual identity should feel:

CALM
+
PRECISE
+
HUMAN
+
DATA-RICH
+
INSTITUTIONAL
+
MODERN

The interface should be visually impressive because of:

TYPOGRAPHY
COMPOSITION
DATA VISUALIZATION
INTERACTION
MOTION
SPACING
CONSISTENCY

NOT because of:

GRADIENTS
GLOW
3D
GLASS
PARTICLES
DECORATION

KEEP BUTTON LABELS SIMPLE.

KEEP CONTENT SHORT.

KEEP THE UI CLEAN.

KEEP DATA REAL.

KEEP COMPONENTS CONSISTENT.

KEEP MOTION PURPOSEFUL.

KEEP THE USER'S TASK AT THE CENTER.

IMPLEMENT THIS ACROSS THE ENTIRE EXISTING WEBSITE.
DO NOT CREATE A PARALLEL UI.
DO NOT BREAK EXISTING FUNCTIONALITY.
DO NOT FABRICATE CONTENT OR DATA.