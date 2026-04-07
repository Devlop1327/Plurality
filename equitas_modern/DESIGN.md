# Design System Strategy: The Inclusive Spectrum

This document serves as the foundational design language for our educational platform. It is engineered to move beyond the rigid, clinical structures of traditional learning management systems, opting instead for a "High-End Editorial" approach that feels safe, sophisticated, and deeply human.

## 1. Creative North Star: "The Living Archive"
The platform is not a static database; it is a breathing, evolving space for human stories. Our North Star, **The Living Archive**, dictates a layout strategy that favors organic flow over mechanical grids. By utilizing intentional asymmetry, overlapping layers, and varying typographic scales, we create a sense of movement and "Plurality." This system rejects the "boxed-in" feeling of legacy software to embrace the fluidity of the subjects we teach.

## 2. Color & Atmosphere
Our palette uses tonal depth to represent diversity without visual clutter. It is grounded in the soft warmth of `surface` (#fbf9f8) while using `primary` (Lavender) and `secondary` (Teal) to guide the eye.

### The "No-Line" Rule
To maintain an empathetic and soft environment, **1px solid borders are strictly prohibited** for sectioning. Boundaries must be defined through:
- **Tonal Shifts:** Transitioning from `surface` to `surface-container-low`.
- **White Space:** Using aggressive vertical margins to separate concepts.
- **Color Blocks:** Soft, large-scale background shifts using `secondary_fixed` or `primary_fixed`.

### Surface Hierarchy & Nesting
Think of the UI as layers of fine, recycled paper. Use `surface_container` tiers to create depth:
1. **Base Layer:** `surface` (The canvas).
2. **Section Layer:** `surface_container_low` (Subtle grouping).
3. **Interactive Layer:** `surface_container_lowest` (Cards and actionable items that "pop" forward).
4. **Hero Layer:** `surface_container_highest` (Deeply recessed or highly emphasized content).

### The "Glass & Gradient" Rule
For floating elements (modals, persistent navigation), use **Glassmorphism**. Apply `surface` with 80% opacity and a `backdrop-blur` of 12px. To add "soul," use subtle linear gradients for hero sections, transitioning from `primary_container` (#7e57c2) to `primary` (#653da7) at a 135-degree angle.

## 3. Typography
We use a dual-font pairing to balance authority with accessibility.

*   **Display & Headlines (Plus Jakarta Sans):** Chosen for its geometric clarity and modern "editorial" feel. High-contrast sizing (e.g., `display-lg` vs `headline-sm`) should be used to create an intentional rhythm on the page.
*   **Body & Labels (Lexend):** Specifically designed to reduce visual stress and improve reading proficiency. This is our "empathy" font.

**Hierarchy Strategy:** 
Use `display-md` for landing headers to command attention, but revert to `title-lg` for educational content to keep the reading experience intimate and non-intimidating. Always maintain a minimum of 1.5x line-height for `body-lg` to ensure maximum accessibility.

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are too "digital." We convey hierarchy through environmental physics.

*   **The Layering Principle:** Instead of a shadow, place a `surface_container_lowest` card on a `surface_container` background. The slight shift in lightness creates a "Soft Lift" that feels natural.
*   **Ambient Shadows:** If an element must float (like a FAB), use a custom shadow: `0px 20px 40px rgba(74, 68, 82, 0.06)`. This uses a tinted version of `on_surface_variant` rather than pure black, mimicking natural light.
*   **The "Ghost Border" Fallback:** If accessibility requires a stroke (e.g., in high-contrast modes), use `outline_variant` at **20% opacity**. It should be felt, not seen.

## 5. Components & Interface Elements

### Buttons
- **Primary:** Rounded `xl` (3rem), `primary` background with `on_primary` text. No shadow.
- **Secondary:** `secondary_container` background. Provides a soft alternative for secondary actions.
- **Tertiary:** No background. Use `title-sm` weight with an underline in `primary` only on hover.

### Cards & Lists
- **The Forbidding of Dividers:** Never use horizontal rules (`<hr>`). Separate list items using 16px of vertical padding and a background hover state of `surface_container_high`.
- **Card Styling:** Use `md` (1.5rem) or `lg` (2rem) corner radius. Use `surface_container_low` as the base color.

### Progress Indicators
- Use the `secondary` (Teal) color for progress. 
- Avoid thin lines; use thick (8px), rounded tracks with a `secondary_container` background to make the "journey" feel substantial and rewarding.

### Interactive Inputs
- **Fields:** Use `surface_container_highest` for the input track to create a "recessed" feel. On focus, transition the background to `surface_container_lowest` and add a 2px `primary` ghost-border (20% opacity).

### Specialized Components for Plurality & Diversity
- **Spectrum Sliders:** For gender or identity exploration tools, use a gradient track from `primary_fixed` to `secondary_fixed` to represent non-binary transitions.
- **Safe-Space Toggles:** For sensitive content, use a "Glass" overlay that blurs content until the user explicitly interacts.

## 6. Do’s and Don’ts

### Do
*   **Do** embrace asymmetry. Align a headline to the left but push the body text to a 66% width column on the right.
*   **Do** use `primary_fixed` for "lightbulb moments" or "did you know" callouts.
*   **Do** ensure all text/background combinations meet a minimum 4.5:1 contrast ratio, utilizing the `on_` color tokens accurately.

### Don't
*   **Don't** use `none` or `sm` roundedness. This system must feel soft; sharp corners contradict our "safe space" mood.
*   **Don't** use standard 1px dividers. If you feel the need for a line, use a 48px gap instead.
*   **Don't** use pure black (#000000) for text. Always use `on_surface` (#1b1c1b) to maintain a premium, editorial softness.