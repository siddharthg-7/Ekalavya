You are a senior UI/UX engineer and frontend motion designer.

I am providing a reference image for a section called:

"THE EKALAVYA APPROACH"

Your job is to IMPLEMENT THIS SECTION in the existing project.

IMPORTANT:

This time, visual fidelity is the priority.

Do NOT redesign the composition.

Do NOT replace the pipeline with a different UI concept.

Do NOT make it more "creative".

Do NOT introduce AI-generated design patterns.

Reproduce the reference's:

- hierarchy
- proportions
- spacing
- composition
- visual weight
- colors
- typography hierarchy
- pipeline structure
- card arrangement
- dark panel
- CTA placement

Then improve the implementation quality, responsiveness and interaction using Motion for React.

The final result should look like the reference at first glance.

--------------------------------------------------
TECHNOLOGY
--------------------------------------------------

Use the existing project's framework.

Use Motion for React.

Import:

import { motion } from "motion/react";

Use standard Motion APIs only.

Allowed:

motion
variants
whileInView
whileHover
whileTap
useScroll
useTransform
useReducedMotion
layout

Do NOT require Motion+.

Do NOT use premium Motion+ components.

Motion's standard React API supports viewport-triggered animation, gestures and coordinated variants. Use those capabilities appropriately.

Reference:
https://motion.dev/docs/react

--------------------------------------------------
SECTION OBJECTIVE
--------------------------------------------------

This section explains the Ekalavya competency-development approach.

The conceptual flow is:

ROLE
↓
PROFILE
↓
GAP ANALYSIS
↓
LEARNING
↓
ASSESSMENT
↓
GROWTH

This six-stage pipeline is the PRIMARY visual element.

The user should immediately understand:

"We identify what the role requires,
understand the person's current competency,
identify gaps,
recommend learning,
measure the result,
and demonstrate growth."

--------------------------------------------------
OVERALL COMPOSITION
--------------------------------------------------

Create a large white section.

Background:

#FFFFFF

The section should have substantial whitespace.

Maximum content width:

approximately 1280–1320px.

Center everything horizontally.

Desktop section:

approximately 900–1000px tall.

The composition is:

                EYEBROW

        MAIN HEADLINE
             ↓
        DESCRIPTION

             ↓

     ┌─────────────────────────────┐
     │                             │
     │   DARK PIPELINE CONTAINER   │
     │                             │
     │  01 → 02 → 03 → 04 → 05 → 06
     │                             │
     │                             │
     │  VALIDATION      CTA        │
     └─────────────────────────────┘

Do not move the pipeline to the left or right.

It is centered beneath the introduction.

--------------------------------------------------
TOP EYEBROW
--------------------------------------------------

Centered.

Text:

THE EKALAVYA APPROACH

Uppercase.

Font:

12–13px.

Weight:

700.

Letter spacing:

approximately 0.12em.

Color:

#2563EB

Add extremely subtle horizontal rules on either side if they match the reference.

Keep them thin.

Do not make the eyebrow large.

--------------------------------------------------
HEADLINE
--------------------------------------------------

Exact text:

From Competency Gaps
to Measurable Growth.

Center aligned.

Desktop:

approximately 40–44px.

Weight:

600–650.

Line height:

1.05–1.12.

Color:

#102E4A.

The phrase:

"Measurable Growth."

should have blue emphasis.

Use:

#2563EB

Do NOT use a blue gradient.

Do NOT animate individual letters.

Do NOT use typewriter animation.

The typography should feel institutional and polished.

--------------------------------------------------
DESCRIPTION
--------------------------------------------------

Exact text:

Ekalavya brings competency intelligence, personalized learning, adaptive assessment and progress measurement into one continuous learning experience.

Maximum width:

approximately 680–720px.

Center aligned.

Font:

18px.

Line height:

1.55–1.65.

Color:

#55708F.

Spacing below headline:

approximately 22–26px.

--------------------------------------------------
MAIN PIPELINE CONTAINER
--------------------------------------------------

This is the most important element.

Create a large dark navy panel.

Approximate desktop dimensions:

1260px wide

430px high

Use:

background:
#071B35

or a very close deep navy.

Border:

1px solid rgba(255,255,255,0.08)

Border radius:

26–30px.

Shadow:

0 24px 60px rgba(7,27,53,0.16)

The panel should feel premium and substantial.

It should NOT look like a dashboard.

It is an explanatory system diagram.

--------------------------------------------------
PIPELINE PANEL HEADER
--------------------------------------------------

Inside the panel:

top padding:
56px

horizontal padding:
60px

Create a header row.

LEFT:

small cyan/blue status dot.

Text:

CONTINUOUS COMPETENCY INTELLIGENCE PIPELINE

Typography:

12–13px

uppercase

monospace or technical-looking font is acceptable ONLY for this small label.

Weight:

600–700.

Color:

#D6E4F5

Dot:

#22D3EE

RIGHT:

Real-time Telemetry

Font:

12–13px.

Color:

#8EA7C4

Optional small green/cyan status dot.

Keep this extremely subtle.

--------------------------------------------------
HEADER DIVIDER
--------------------------------------------------

Below the header:

1px horizontal line.

Color:

rgba(255,255,255,0.09)

Spacing:

approximately 24px below header.

--------------------------------------------------
PIPELINE STAGE AREA
--------------------------------------------------

Create six stages horizontally.

Exactly:

01 ROLE
02 PROFILE
03 GAP ANALYSIS
04 LEARNING
05 ASSESSMENT
06 GROWTH

Each stage is a card.

Desktop:

six cards in one row.

They should fit inside the dark container.

Do NOT make them too small.

Use approximately:

150–175px width each.

Gap:

20–22px.

--------------------------------------------------
STAGE CARD STYLE
--------------------------------------------------

Background:

#132945

or similar.

Border:

1px solid rgba(148,163,184,0.16)

Border radius:

16px.

Height:

135px approximately.

Padding:

20px.

Cards should have a subtle inset/depth effect.

Do NOT use strong shadows.

--------------------------------------------------
STAGE NUMBER
--------------------------------------------------

Each card has a small stage number.

01
02
03
04
05
06

Position:

top-right or centered above title depending on reference fidelity.

Font:

11–12px.

Weight:

700.

Each stage can use a restrained accent color:

01 blue
02 violet
03 amber
04 green
05 pink/red
06 blue

The accents should be subtle.

--------------------------------------------------
STAGE ICONS
--------------------------------------------------

Use a small icon area inside each card.

Do NOT use giant illustrations.

Suggested icons:

ROLE:
document / badge

PROFILE:
users

GAP ANALYSIS:
bar chart

LEARNING:
book

ASSESSMENT:
check-square

GROWTH:
trending-up

Use Lucide icons if already installed.

If not, install/use the project's existing icon system.

Each icon sits in a small pale tinted square.

Approximately:

44 × 44px.

Radius:

10–12px.

--------------------------------------------------
STAGE CONTENT
--------------------------------------------------

Stage 01:

ROLE

Designation & Cadre
Framework

Stage 02:

PROFILE

Baseline
Competency Matrix

Stage 03:

GAP ANALYSIS

AI-Ranked Skill
Deficits

Stage 04:

LEARNING

Curated iGOT &
NSSTA Modules

Stage 05:

ASSESSMENT

Live Adaptive
Diagnostic

Stage 06:

GROWTH

Demonstrated Score
Mastery

Title:

16–17px.

Weight:

700.

Color:

white.

Description:

13–14px.

Line height:

1.35.

Color:

#9DB3CD.

--------------------------------------------------
CONNECTIONS
--------------------------------------------------

Between each stage:

show a small circular arrow connector.

Example:

[ ROLE ]  →  [ PROFILE ]  →  [ GAP ANALYSIS ]

The connector should visually communicate a process.

Do not make arrows huge.

Circle:

approximately 32px.

Border:

rgba(255,255,255,0.10)

Background:

#142B47

Arrow:

#D7E5F5.

Use a thin connecting line behind or between the circles.

--------------------------------------------------
IMPORTANT: PIPELINE SHOULD FEEL INTERACTIVE
--------------------------------------------------

This is where Motion becomes important.

When the user hovers a stage:

the active card should subtly brighten.

Example:

background:
slightly lighter navy

border:
slightly stronger

y:
-2px

The icon should move approximately:

y: -1px

The stage number can become slightly brighter.

The connector leading to the next stage can become more visible.

Do NOT scale cards dramatically.

Do NOT use glowing neon effects.

--------------------------------------------------
PIPELINE ENTRANCE ANIMATION
--------------------------------------------------

When the pipeline enters the viewport:

Animate the entire dark container:

opacity:
0 → 1

y:
30 → 0

scale:
0.985 → 1

Duration:

0.7–0.8 seconds.

Use:

whileInView="visible"

viewport:

{
  once: true,
  amount: 0.2
}

--------------------------------------------------
STAGE ENTRANCE ANIMATION
--------------------------------------------------

The six cards should enter sequentially.

Do NOT animate each card from a completely different direction.

Use:

opacity:
0 → 1

y:
18 → 0

Scale:

0.98 → 1

Stagger:

approximately 80–100ms.

Sequence:

ROLE
↓
PROFILE
↓
GAP ANALYSIS
↓
LEARNING
↓
ASSESSMENT
↓
GROWTH

The animation should visually reinforce the pipeline.

--------------------------------------------------
CONNECTION ANIMATION
--------------------------------------------------

After each card enters:

animate the connector line / arrow.

Use a subtle opacity transition.

Do NOT make arrows continuously move.

However, when the section first loads, a very subtle left-to-right progression can occur:

ROLE
→
PROFILE
→
GAP ANALYSIS
→
LEARNING
→
ASSESSMENT
→
GROWTH

This should happen ONLY ONCE.

The motion should be approximately:

200–300ms per connection.

Do not make it look like a loading indicator.

--------------------------------------------------
BOTTOM PIPELINE BAR
--------------------------------------------------

Below the six stages:

horizontal divider.

Then create a bottom row.

LEFT:

green/cyan check-circle.

Text:

Zero guesswork. Every recommendation targets a validated deficit.

Font:

14–15px.

Color:

#C7D7E9.

The phrase:

validated deficit

can have slightly stronger emphasis.

RIGHT:

text CTA:

Experience Interactive Pipeline

followed by:

→

Color:

#22D3EE or bright blue.

IMPORTANT:

The CTA should NOT be a giant button in the initial desktop version.

The reference uses a text-based action.

Preserve that visual hierarchy.

--------------------------------------------------
CTA INTERACTION
--------------------------------------------------

On hover:

text moves:

x: 3px

arrow moves:

x: 5px

Color becomes slightly brighter.

No scale.

No giant background.

No glow.

If the existing application has a dedicated pipeline interaction page, make the CTA navigate to that route.

If the route does not exist:

create a clearly identifiable placeholder route rather than inventing a destination.

--------------------------------------------------
INTERACTIVE PIPELINE BEHAVIOR
--------------------------------------------------

I want this section to feel alive but still professional.

When a user hovers over a stage:

1. stage becomes slightly brighter
2. icon gains slightly more contrast
3. stage number becomes brighter
4. connector toward the next stage becomes more visible

No dramatic animations.

The pipeline should feel like a sophisticated system diagram.

--------------------------------------------------
OPTIONAL ACTIVE STAGE STATE
--------------------------------------------------

If implementation allows it without complicating the existing application:

allow clicking a stage.

Selected stage:

slightly brighter background
stronger border
accent color visible
subtle elevation

But do NOT introduce a large modal or dashboard.

The interaction should remain within the pipeline.

If this feature is implemented, use Motion's layout animation carefully so state transitions feel smooth.

--------------------------------------------------
BACKGROUND
--------------------------------------------------

The surrounding page remains predominantly white.

Do NOT use a giant gradient.

Do NOT use purple.

Do NOT use animated blobs.

Do NOT use excessive glassmorphism.

If additional visual depth is required:

use extremely subtle blue radial light behind the panel.

Opacity:

very low.

The dark pipeline itself should create the visual contrast.

--------------------------------------------------
INDIAN / GOVERNMENT CONTEXT
--------------------------------------------------

Keep the design institutional.

Use:

navy
white
government blue
subtle cyan
restrained green
restrained amber

Do NOT add:

Indian flag everywhere
Ashoka Chakra decorations
fake government logos
fake ministry names
fake statistics
fake certifications

The product should feel like:

a modern Government of India digital competency platform.

Not a government portal from 2010.

--------------------------------------------------
MOTION DESIGN PRINCIPLES
--------------------------------------------------

Motion is supporting the information architecture.

It is NOT the attraction.

Use Motion for:

1. section reveal
2. pipeline reveal
3. stage stagger
4. connector progression
5. hover feedback
6. CTA micro-interaction
7. optional active stage layout animation

Do NOT use:

- infinite floating
- excessive parallax
- text scrambling
- typewriter
- spinning cards
- 3D rotations
- elastic bouncing
- cursor effects
- magnetic buttons
- infinite loops

Use Motion's standard React API.

--------------------------------------------------
MOTION VARIANTS
--------------------------------------------------

Prefer variants for coordinated animation.

Conceptually:

const pipelineVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.985
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: "easeOut"
    }
  }
}

const stageVariants = {
  hidden: {
    opacity: 0,
    y: 18
  },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      delay: index * 0.08,
      ease: "easeOut"
    }
  })
}

Adapt this to the project's actual architecture.

Do not blindly copy these values if visual testing shows a better result.

--------------------------------------------------
VIEWPORT BEHAVIOR
--------------------------------------------------

Use:

viewport={{
  once: true,
  amount: 0.2
}}

The pipeline entrance should happen once.

Do not repeatedly replay when scrolling.

Motion officially supports this `whileInView` + `viewport.once` pattern for one-time scroll-triggered animation.

--------------------------------------------------
REDUCED MOTION
--------------------------------------------------

Respect:

prefers-reduced-motion.

Use:

useReducedMotion()

When reduced motion is requested:

remove:

scale animation
y movement
stagger movement
connector progression

Use simple opacity or immediate rendering.

Do not compromise accessibility for visual effects.

--------------------------------------------------
RESPONSIVE DESIGN
--------------------------------------------------

Desktop:

six stages in one row.

Tablet:

six stages can remain horizontal if there is sufficient width.

If not:

allow controlled horizontal scrolling OR transform into a two-row grid.

Do NOT shrink text until it becomes unreadable.

Mobile:

The pipeline should become vertically readable.

Preferred mobile structure:

01 ROLE
↓
02 PROFILE
↓
03 GAP ANALYSIS
↓
04 LEARNING
↓
05 ASSESSMENT
↓
06 GROWTH

Connect each stage vertically.

The dark panel should remain.

CTA should move below the validation message.

Do not simply squeeze six cards into a tiny horizontal row.

--------------------------------------------------
MOBILE MOTION
--------------------------------------------------

On mobile:

keep the same entrance sequence.

Do not add swipe gestures unless they are genuinely useful.

The pipeline should remain accessible to touch users.

Hover-only behavior must not be required for understanding.

--------------------------------------------------
COMPONENT ARCHITECTURE
--------------------------------------------------

Create reusable components:

EkalavyaApproach
ApproachIntro
Pipeline
PipelineStage
PipelineConnector
PipelineFooter

Data:

const stages = [
  {
    number: "01",
    title: "ROLE",
    description: "Designation & Cadre Framework",
    icon: ...
  },
  ...
]

Render using map().

Do not duplicate six blocks manually.

--------------------------------------------------
VISUAL PRECISION
--------------------------------------------------

Before considering this complete, compare the implementation against the reference image.

Check specifically:

1. Width of dark panel
2. Dark panel height
3. Panel corner radius
4. Distance between headline and panel
5. Six-card proportions
6. Horizontal card spacing
7. Header divider
8. Footer divider
9. CTA position
10. Typography sizes
11. Navy color
12. Card background contrast
13. Amount of whitespace
14. Alignment of all six stages
15. Arrow positions

The reference should remain visually recognizable.

--------------------------------------------------
ANTI-AI-SLOP RULE
--------------------------------------------------

Do not add anything that isn't in the visual language of the reference.

Absolutely do NOT add:

gradient blobs
purple gradients
glass cards
floating 3D objects
random icons
fake metrics
fake badges
huge CTA buttons
neon borders
animated backgrounds
random illustrations
extra text
fake logos
unnecessary cards

If something is unnecessary:

remove it.

--------------------------------------------------
FINAL QUALITY STANDARD
--------------------------------------------------

The result should feel like a senior product designer designed a competency intelligence system for a national government platform.

The hierarchy should be:

1. Headline
2. Explanation
3. Pipeline
4. Pipeline interaction
5. Validation statement
6. CTA

The pipeline is the hero of this section.

Build it with precision.

Do not explain your design decisions to me.

Implement it.