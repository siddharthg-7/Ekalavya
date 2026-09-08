You are the senior frontend engineer responsible for implementing
the approved Ekalavya landing page design.

PROJECT:
EKALAVYA

TAGLINE:
Learn Today. Serve Better.

============================================================
YOUR ROLE
============================================================

You are NOT a product designer at this stage.

The visual design has already been decided.

Your job is to faithfully IMPLEMENT the approved design in code.

Do not redesign the page.
Do not invent new sections.
Do not change the visual hierarchy.
Do not replace the approved layout with your preferred layout.
Do not add unnecessary UI.

Treat the approved Google Stitch design/reference screenshot as the
VISUAL SOURCE OF TRUTH.

Treat the existing project architecture and functional requirements
as the TECHNICAL SOURCE OF TRUTH.

If something is unclear visually, inspect the reference before making
a design decision.

============================================================
FIRST ACTION — INSPECT THE PROJECT
============================================================

Before changing any code:

1. Inspect the entire existing frontend structure.
2. Identify the framework and build system.
3. Identify the routing system.
4. Identify existing reusable components.
5. Identify existing Tailwind/CSS configuration.
6. Identify existing fonts.
7. Identify existing assets.
8. Identify the supplied Ekalavya logo.
9. Identify whether a loading animation already exists.
10. Identify whether the project already contains dashboard,
    authentication, or other application screens.

Do NOT delete existing functionality blindly.

Do NOT rewrite the entire project unless absolutely necessary.

First understand what already exists.

After inspection, implement only the LANDING PAGE in this phase.

Do not modify dashboard functionality unless required for routing.

============================================================
DESIGN SOURCE OF TRUTH
============================================================

Use the approved Ekalavya landing-page reference design supplied
with this task.

The visual result must closely reproduce the reference.

Match:

- layout
- spacing
- typography
- alignment
- proportions
- section heights
- button dimensions
- border radius
- borders
- shadows
- image treatment
- navigation positioning
- product mockups
- visual hierarchy
- responsive behavior

Do not merely reproduce the content.

Reproduce the DESIGN LANGUAGE.

============================================================
BRAND
============================================================

Brand:
Ekalavya

Tagline:
Learn Today. Serve Better.

Use the supplied Ekalavya logo.

Do NOT redesign the logo.

Do NOT replace it with:
- a generic icon
- an SVG icon library
- a generated logo
- a government emblem

The Ekalavya logo is the official product mark.

If the logo asset exists in the project, reuse it.

If multiple versions exist, choose the clean transparent version.

============================================================
IMPORTANT BRANDING RULE
============================================================

The landing page must NEVER contain:

"SIH"

"Smart India Hackathon"

"Hackathon"

or hackathon branding.

The product should be presented entirely as:

Ekalavya

Do not falsely represent Ekalavya as an existing official government
service.

Use synthetic/demo information where required.

============================================================
VISUAL DIRECTION
============================================================

The product should feel like:

Premium Indian GovTech
+
modern enterprise software
+
accessible public-service design
+
AI/data intelligence

It must NOT feel like:

- generic SaaS
- startup template
- crypto dashboard
- gaming UI
- futuristic cyberpunk AI
- excessive glassmorphism
- neon interface
- conventional government website clone

We want:

"Government-ready"

not:

"Government website copy."

============================================================
DESIGN PRINCIPLES
============================================================

Apply these principles throughout the implementation:

1. If you have to explain it, simplify it.
2. White space is part of the design.
3. If everything stands out, nothing does.
4. Two focal points = zero focus.
5. Use color with purpose.
6. Simplicity is earned.
7. Typography should feel invisible.
8. Good design solves a problem.

Do not add visual elements merely to fill empty space.

============================================================
COLOR TOKENS
============================================================

Use CSS variables/design tokens.

Primary Deep Navy:
#102A43

Intelligence Blue:
#2563D9

Growth Green:
#16845B

Saffron:
#E8871A

Page Background:
#F7F9FC

White:
#FFFFFF

Primary Text:
#102A43

Secondary Text:
#52657A

Border:
#DCE3EA

Do not introduce unrelated colors.

Do not use purple gradients.

Do not use neon colors.

Do not turn the website into an Indian-flag color theme.

Color must communicate meaning:

Blue:
primary action / intelligence

Green:
progress / improvement / positive competency state

Saffron:
attention / important highlights

Neutral:
structure / content

============================================================
TYPOGRAPHY
============================================================

Use Noto Sans.

If Noto Sans is not currently configured:

configure it properly.

Do not substitute a decorative or futuristic font.

Typography hierarchy:

Hero:
approximately 60–68px desktop

Section headings:
approximately 40–48px

Body:
16–18px

Navigation:
14–15px

Small labels:
12–13px

Use appropriate line-height.

Do not use excessive font weights.

Do not use all-caps paragraphs.

Typography should feel effortless and highly readable.

============================================================
PAGE CONTAINER
============================================================

Use a consistent maximum content width:

approximately 1200–1320px.

Maintain the same horizontal alignment across sections.

Use a 12-column desktop grid where appropriate.

Do not make every section full-width without reason.

Use generous whitespace.

============================================================
NAVIGATION
============================================================

Implement a minimal premium navigation.

Desktop:

LEFT:
Ekalavya logo

CENTER:
How it works
FAQ
For Officials
For Organizations

RIGHT:
EN ▼
Get Started

Only "Get Started" is the primary CTA.

Do not add unnecessary navigation items.

Do not add:
- Dashboard
- About
- Resources
- Blog
- Pricing

unless explicitly required later.

The navbar should feel lightweight.

It must not look like a conventional government navigation bar.

============================================================
HERO SECTION
============================================================

The hero is the primary visual focus.

Use the approved reference composition.

Left side:

Eyebrow:

AI-POWERED COMPETENCY INTELLIGENCE

Headline:

Turn Your Potential
Into Greater Impact.

Supporting copy:

Understand your competencies, identify skill gaps,
get personalized learning, and measure real progress —
all in one place.

Primary CTA:

Get Started →

Under CTA:

Free to use • No complicated setup

Do NOT add another prominent CTA.

============================================================
HERO BACKGROUND
============================================================

Use a premium, realistic background image consistent with the
approved design.

Recommended visual direction:

A professional Indian government/statistical official working
at a desk with a laptop in a modern institutional environment.

The person must not be identifiable.

The image should be subtle.

Do not use:
- politicians
- famous public figures
- prominent government buildings
- tourist imagery
- excessive Indian flags
- stereotypical government imagery

Use a dark/navy overlay if required for text contrast.

The background must support the content rather than compete with it.

============================================================
HERO PRODUCT VISUAL
============================================================

The hero product preview is critical.

Create a realistic Ekalavya product interface showing:

MY COMPETENCY PROFILE

Overall Competency
68%

Statistical Methods
82%

Python
42%

Cybersecurity
32%

Survey Design
54%

Then an insight card:

3 Priority Gaps Identified

Your personalized learning path is ready.

[ View Learning Path ]

This is a visual representation of the product.

It must look like a real product interface.

Use:

- subtle borders
- realistic spacing
- clean typography
- restrained charts
- professional cards
- no excessive shadows
- no unnecessary gradients

============================================================
HERO JOURNEY
============================================================

Subtly communicate:

IDENTIFY
→
LEARN
→
ASSESS
→
IMPROVE

This should support the product visual.

Do not make this a giant additional graphic.

============================================================
SOCIAL PROOF / TRUST STRIP
============================================================

After hero:

Heading:

Built for India’s Government Learning Ecosystem

Show:

Competency Framework
iGOT Karmayogi
NSSTA
AI-Powered Learning & Assessment

Do not invent:

- user counts
- department counts
- government adoption statistics
- testimonials
- awards
- fake partner logos

============================================================
PROBLEM SECTION
============================================================

Label:

THE CHALLENGE

Headline:

Access to Learning Is Not Enough.

Supporting copy:

Knowing what to learn, why it matters, and whether it is actually
improving your competencies can be difficult.

Show three problem areas:

01
Unclear Skill Gaps

Know where development is needed.

02
One-Size-Fits-All Learning

Different officials can require different learning paths.

03
Limited Feedback

Learning completion does not always demonstrate competency.

Use minimal line icons.

Do not create huge colorful cards.

============================================================
SOLUTION SECTION
============================================================

Label:

THE EKALAVYA APPROACH

Headline:

From Competency Gaps
to Measurable Growth.

Supporting text:

Ekalavya brings competency intelligence, personalized learning,
adaptive assessment and progress measurement into one continuous
learning experience.

Show the product journey:

ROLE
↓
COMPETENCY PROFILE
↓
AI GAP ANALYSIS
↓
PERSONALIZED LEARNING
↓
ADAPTIVE ASSESSMENT
↓
MEASURED IMPROVEMENT

This should feel like a product system rather than a decorative
infographic.

============================================================
FEATURES
============================================================

Create six major feature experiences.

Do NOT make all six identical cards.

Use varied editorial layouts while maintaining one design system.

FEATURE 01

Personalized Competency Profile

Benefit:

See where your competencies stand.

Visual:
Competency radar / profile interface.

------------------------------------------------------------

FEATURE 02

AI Skill-Gap Analysis

Benefit:

Focus development where it matters most.

Visual:

Python

42% ─────────────── 80%

Gap:
38%

------------------------------------------------------------

FEATURE 03

Relevant Learning Recommendations

Benefit:

Spend less time searching and more time learning.

Visual:

94% Competency Match

Python for Government Data Analysis

✓ Python
✓ Data Processing
✓ Statistical Analysis

------------------------------------------------------------

FEATURE 04

Adaptive Assessments

Benefit:

Assessments respond to what you know.

Visual flow:

Question
↓
Wrong Answer
↓
Reinforce Same Concept
↓
Easier Question
↓
Correct Answer
↓
Mastery

This is a key product differentiator.

Give this feature stronger visual emphasis.

------------------------------------------------------------

FEATURE 05

Measure Your Progress

Benefit:

See demonstrated learning reflected in your competency profile.

Visual:

Cybersecurity

Before
32%

After
48%

+16 points

Do not visually imply that a single assessment guarantees mastery.

------------------------------------------------------------

FEATURE 06

Workforce Intelligence

Benefit:

Help organizations understand capability gaps at scale.

Visual:

Department competency heatmap.

============================================================
HOW IT WORKS
============================================================

Heading:

Four Steps. One Clear Learning Journey.

Steps:

01
CREATE YOUR PROFILE

02
IDENTIFY YOUR GAPS

03
LEARN & ASSESS

04
TRACK YOUR GROWTH

Desktop:
horizontal journey.

Mobile:
vertical journey.

Below:

No complicated setup.
No course hunting.
No one-size-fits-all assessment.

============================================================
OUTCOMES
============================================================

Heading:

Designed Around Real Workforce Needs.

Three audiences:

Government Officials
Know what to learn next.

Organizations
Understand where capability gaps exist.

Training Teams
Build more targeted learning experiences.

Keep this section concise.

============================================================
FAQ
============================================================

Create an accessible accordion.

Questions:

What is Ekalavya?

How does Ekalavya identify competency gaps?

Is Ekalavya free to use?

How are learning recommendations generated?

Are the assessments adaptive?

What happens when I answer incorrectly?

Is Ekalavya a replacement for iGOT?

Can organizations use Ekalavya?

How is my competency profile updated?

Is Ekalavya connected to live government systems?

FAQ must support:

keyboard navigation
focus states
ARIA attributes
smooth but restrained animation
reduced-motion preference

============================================================
FINAL CTA
============================================================

Use the approved visual composition.

Background:
subtle premium Indian landscape.

Avoid famous landmarks.

Avoid tourist imagery.

Avoid flags.

Headline:

Ready to Build Your Skills
for a Greater Tomorrow?

Supporting:

Start your learning journey with Ekalavya today.

Primary CTA:

Get Started →

Below:

Free to use • No complicated setup

============================================================
FOOTER
============================================================

Deep navy footer.

Ekalavya logo.

Learn Today. Serve Better.

Links:

PLATFORM
How It Works
For Officials
For Organizations

SUPPORT
FAQ
Accessibility
Help
Contact

LEGAL
Privacy
Terms
Sitemap

Bottom:

© Ekalavya

Do not mention SIH.

============================================================
ACCESSIBILITY
============================================================

Accessibility is a core requirement.

Implement:

- semantic HTML
- proper heading hierarchy
- keyboard navigation
- visible focus indicators
- accessible buttons
- accessible accordion
- sufficient contrast
- alt text
- reduced motion support
- responsive text
- touch-friendly controls

Do not rely on color alone to communicate status.

For charts and competency visuals, provide accessible textual
information.

============================================================
RESPONSIVENESS
============================================================

Support:

1920px
1440px
1280px
1024px
768px
390px

Desktop:
full editorial layout.

Tablet:
reduce columns intelligently.

Mobile:
stack sections.

Navigation:
collapse into accessible mobile menu.

Hero:
stack headline and product visual.

Feature layouts:
convert to single-column where necessary.

How It Works:
vertical.

FAQ:
full-width accordion.

No horizontal scrolling.

Do not simply shrink the desktop layout.

Actually redesign the spacing behavior for mobile while preserving
the approved visual hierarchy.

============================================================
ANIMATION
============================================================

Keep motion subtle.

The existing logo loading animation should remain separate.

Landing page animation:

- subtle fade-in
- restrained product-preview movement
- small chart animations
- gentle hover states
- smooth FAQ expansion

Do NOT use:

- parallax overload
- bouncing cards
- spinning logos
- excessive particles
- glowing neon effects
- scroll hijacking
- large entrance animations

Respect:

prefers-reduced-motion

============================================================
IMAGES
============================================================

Do not download random stock images without evaluating them.

If image assets already exist in the project, inspect and reuse them.

If placeholder images are needed during implementation, create a clear
asset abstraction so they can easily be replaced later.

Do not use broken image URLs.

Do not use copyrighted/random celebrity images.

============================================================
CODE QUALITY
============================================================

Build reusable components.

Suggested structure:

LandingPage
├── Navbar
├── Hero
├── TrustStrip
├── ProblemSection
├── SolutionSection
├── FeatureSection
├── AdaptiveAssessmentFeature
├── HowItWorks
├── Outcomes
├── FAQ
├── FinalCTA
└── Footer

Create reusable:

Button
SectionHeading
FeatureVisual
CompetencyBar
ProductCard
Accordion
Container

Use existing project conventions where appropriate.

Do not introduce unnecessary dependencies.

Keep the implementation maintainable.

============================================================
IMPORTANT — DO NOT TOUCH
============================================================

Unless required for landing-page routing:

Do not modify:

- authentication logic
- dashboard logic
- backend APIs
- database
- Firebase
- AI integration
- assessment engine
- admin functionality

This phase is specifically for the landing page.

============================================================
ROUTING
============================================================

Landing page should be available at:

/

"Get Started" should route to the existing authentication/login
flow if one already exists.

Do not build fake authentication just for the landing page.

If authentication is not yet implemented, create a clean route
placeholder without breaking the rest of the project.

============================================================
FINAL IMPLEMENTATION REQUIREMENT
============================================================

Before considering the landing page complete:

1. Run the application.
2. Inspect the landing page at desktop width.
3. Inspect at 1440px.
4. Inspect tablet.
5. Inspect 390px mobile.
6. Check all navigation links.
7. Check Get Started.
8. Check FAQ accordion.
9. Check keyboard navigation.
10. Check console for errors.
11. Check image loading.
12. Check responsive overflow.
13. Check typography.
14. Check spacing.
15. Check visual hierarchy.

Then perform a visual comparison against the approved reference.

Correct:

- spacing
- proportions
- alignment
- font sizes
- section heights
- CTA placement
- image scale
- card sizes
- border radius
- colors

Do NOT stop at "the page works."

The requirement is:

FUNCTIONAL + VISUALLY FAITHFUL + ACCESSIBLE.

============================================================
MOST IMPORTANT RULE
============================================================

DO NOT REDESIGN.

DO NOT ADD FEATURES.

DO NOT MAKE CREATIVE CHANGES TO THE APPROVED UI.

Implement the approved Ekalavya design as faithfully as possible.

If you think something could look better, do not change it automatically.

Preserve the approved design.