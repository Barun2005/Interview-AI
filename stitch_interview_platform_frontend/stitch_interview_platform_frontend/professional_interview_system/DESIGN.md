---
name: Professional Interview System
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45464d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#006a61'
  on-secondary: '#ffffff'
  secondary-container: '#86f2e4'
  on-secondary-container: '#006f66'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#191c1e'
  on-tertiary-container: '#818486'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#89f5e7'
  secondary-fixed-dim: '#6bd8cb'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#005049'
  tertiary-fixed: '#e0e3e5'
  tertiary-fixed-dim: '#c4c7c9'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#444749'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-code:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

The design system is centered on the concept of "Guided Confidence." For an interview platform, the emotional objective is to mitigate candidate anxiety while providing interviewers with a high-utility, professional environment. 

The aesthetic is a blend of **Corporate Modern** and **Soft Minimalism**. It prioritizes clarity and focus, utilizing generous whitespace to prevent cognitive overload. The visual language is calm and intentional, ensuring that the interface never competes with the conversation or the technical tasks at hand. High-quality typography and a restrained color palette create an atmosphere of institutional stability and modern efficiency.

## Colors

The palette is designed to evoke trust and precision. 
- **Primary (Deep Blue):** Used for core branding, primary navigation, and high-level headings. It provides the "anchor" for the professional look.
- **Secondary (Teal):** Used for primary actions, success states, and focus indicators. It adds a fresh, modern energy that feels more approachable than a traditional corporate blue.
- **Neutral (Slate):** A sophisticated range of cool grays used for secondary text and subtle UI borders, maintaining a soft contrast that reduces eye strain.
- **Backgrounds:** The interface utilizes a tiered white and off-white system (Slate 50) to distinguish content areas without relying on harsh lines.

## Typography

This design system uses a triple-font strategy to balance character with utility:
- **Manrope** is used for headlines. Its modern, geometric construction provides a confident and welcoming personality.
- **Inter** is the workhorse for all body copy and interface elements. Its exceptional legibility at small sizes ensures that interview instructions and chat messages are easily digestible.
- **JetBrains Mono** is utilized for code snippets, technical labels, and data points, providing the "technical" precision required for developer interviews.

Letter spacing is tightened slightly for headlines to maintain a cohesive look, while body text remains at default tracking for maximum readability.

## Layout & Spacing

The layout follows a **fluid grid** model with strict maximum widths to prevent line lengths from becoming unreadable.
- **Desktop:** A 12-column grid with 24px gutters. Main content usually spans the central 8-10 columns, while sidebars for chat or candidate notes occupy the remaining space.
- **Tablet:** An 8-column grid with 16px gutters. Sidebars transition to collapsible drawers or bottom sheets.
- **Mobile:** A 4-column grid with 16px margins. Vertical stacking is enforced, and interactive elements are scaled for touch-friendly targets.

Spacing follows a 4px baseline. Generous padding (minimum 24px) is required within cards and containers to create the "airy" feel that reduces candidate stress.

## Elevation & Depth

To maintain a clean and professional appearance, this design system avoids heavy shadows. Instead, it uses **Tonal Layers** and **Soft Ambient Shadows**.

- **Level 0 (Floor):** Background color (Slate 50).
- **Level 1 (Cards/Sidebar):** Pure white surface with a 1px border in Slate 200. No shadow.
- **Level 2 (Active Elements/Modals):** Pure white surface with a very soft, diffused shadow (0px 4px 20px, 5% opacity Primary color).
- **Interactive Depth:** On hover, buttons and interactive cards should transition their border color to the Secondary (Teal) or Primary (Deep Blue) rather than increasing shadow depth, keeping the UI feeling "flat but responsive."

## Shapes

The design system employs **Rounded** corners to soften the professional environment and make the platform feel more approachable. 
- **Standard UI (Buttons, Inputs):** 0.5rem (8px) radius.
- **Containers (Cards, Section Wrappers):** 1rem (16px) radius.
- **Feature Elements (Avatars, Tags):** 1.5rem (24px) or fully pill-shaped.

Rounded corners must be applied consistently to all interactive elements to reinforce the "calm and friendly" brand narrative.

## Components

- **Buttons:** Primary buttons use the Teal secondary color with white text. Secondary buttons use a Slate 100 background with Deep Blue text. All buttons have a subtle 300ms transition on hover.
- **Inputs:** Form fields use a 1px Slate 200 border. On focus, the border changes to Teal with a soft 2px Teal outer glow (10% opacity).
- **Cards:** Used to group candidate info or interview questions. Cards are white with a 1px Slate 200 border and 1rem rounded corners. 
- **Chips/Tags:** Used for skills or status (e.g., "In Progress"). These are pill-shaped with low-saturation background tints of the status color (e.g., light teal background with dark teal text).
- **Lists:** Clean rows with 16px vertical padding, separated by subtle 1px Slate 100 dividers. Hover states for list items use a Slate 50 background.
- **Code Editor:** A clean, minimal container with a darker background (Deep Blue 900) to create a focused "workspace" separate from the conversational UI. Use JetBrains Mono for all content within this component.