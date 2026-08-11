# UI/UX DESIGN

## Goal

Provide a structured, design-first framework for planning, wireframing, styling, and internationalizing the scheduling and operations user interface.

---

## Required Modes

To apply the `UI_UX_DESIGN` skill, the agent must align their actions with the active development stage:

### 1. PLAN_MODE (Design & Specifications Phase)
- **Focus**: Problem framing, wireframe drafting, typography pairing, style guide definition, and client feedback review.
- **Scope**: Adding layout descriptions, drafting CSS variables lists, planning component states, mapping translation keys, and planning image asset structures.
- **Rule**: Do not write or modify production CSS or HTML files in this mode.

### 2. EXEC_MODE (Styling & Component Implementation Phase)
- **Focus**: Coding styles, layout templates, asset integrations, and UI state triggers.
- **Scope**: Editing `style.css`, writing HTML template files, configuring transitions/animations, mapping `data-translate-key` tags to DOM nodes, and integrating CDN assets ( Lucide, Chart.js).
- **Rule**: Follow the design system tokens planned during the specifications phase.

---

## UI/UX Design Principles

- **Premium SaaS Styling**: Avoid raw emojis or default browser input blocks. Use cool slates (`#cbd5e1`, `#475569`), vibrant teals (`#0d9488`), and soft sky blue gradients.
- **Typographic Scale**: Always use Google Fonts (such as `Outfit` for large heading labels, and `Inter` for clean body descriptions).
- **Layout Elasticity**: Use Flexbox and CSS Grids with percentage/fraction widths. Avoid hardcoded `px` widths on containers to ensure mobile responsiveness.
- **Visual Feedback**: Every button, navigation link, and table row must have transition hovers (`transition: all 0.2s ease`).

---

## Workflow Checklist

1. **Tokens Definition**: Establish color variables, shadows, margins, and border radii in `:root`.
2. **HTML Layout Skeleton**: Write clean semantic markup structures.
3. **Responsive Grid Styling**: Apply CSS variable rules to adapt headers, containers, and cards.
4. **Interactive States**: Code hover, focus, and state transition animations.
5. **i18n Mappings**: Bind text elements to translation keys (`data-translate-key`) and input placeholders to `data-translate-placeholder`.

---

## Good Candidates in this Project

- **Scheduling Calendar Grid**: Adapting hour lanes and groomer roster columns.
- **Drawer Panels**: Styling the slide-out checkout and booking overlay boards.
- **Analytics Canvas**: Customizing Chart.js doughnut color palettes to match the SaaS style.
- **Language Switch Widget**: Aligning language flags or toggles in the header actions.
