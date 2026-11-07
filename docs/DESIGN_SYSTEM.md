# MOVISABIO — ENTERPRISE DESIGN SYSTEM SPECIFICATION
**Document ID:** `docs/DESIGN_SYSTEM.md`  
**Phase:** Phase C — Technical Foundation, Project Audit & Development Readiness  
**Target Repository:** `movisabio-website`  
**Status:** Complete & Validated  

---

## 1. Design System Philosophy & Core Identity

The MoviSabio Enterprise Design System establishes a cohesive, authoritative, and clean visual language. Drawing inspiration from institutional infrastructure platforms and cutting-edge geospatial intelligence systems, it balances executive readability with high-density technical specifications.

The visual system is anchored in **Signature Aubergine (`#4A154B`)**, deep plum contrast shells (`#2c0a3b`), an expansive high-contrast light canvas (`#F4F5F5` / `#FFFFFF`), and purposeful semantic accents.

---

## 2. Design Tokens (`assets/css/variables.css`)

### 2.1 Color Palette Tokens

```css
:root {
    /* Brand Primary Palette */
    --primary-color:         #4A154B;  /* Canonical Aubergine - Primary interactive & brand focus */
    --brand-purple:          #4A154B;  /* Signature Brand Color */
    --brand-purple-dark:     #2c0a3b;  /* Deep Plum - Hero headers & contrast footer shell */
    --brand-purple-light:    #6a1b72;  /* Medium Orchid - Gradient midpoints & subtle hover states */

    /* Semantic Accent Palette */
    --accent-secondary:      #36C5F0;  /* Sky Blue / Cyan - High-visibility badges & secondary CTAs */
    --accent-success:        #2EB67D;  /* Emerald Green - Verified simulation KPIs & positive deltas */
    --accent-warning:        #ECB22E;  /* Warm Gold / Amber - Protocol specs & roadmap items */
    --accent-danger:         #E01E5A;  /* Vivid Crimson - Alert callouts, emergency preemption */

    /* Canvas & Surface Tokens */
    --bg-primary:            #F4F5F5;  /* Off-White Enterprise Canvas */
    --bg-secondary:          #FFFFFF;  /* Elevated Pure White Surface */
    --bg-card:               #FFFFFF;  /* Card Background */
    --bg-card-hover:         #FAF7FB;  /* Subtle Aubergine Tint on Card Hover */
    --bg-glass:              rgba(255, 255, 255, 0.94); /* Translucent Navbar Glass */

    /* Typography Color Tokens */
    --text-primary:          #1D1C1D;  /* Deep Charcoal - Body & Header copy (WCAG AAA) */
    --text-secondary:        #525052;  /* Medium Slate - Subtitles, descriptions, table body */
    --text-muted:            #616061;  /* Slate Gray - Captions, metadata, hints */
    --text-inverse:          #FFFFFF;  /* Crisp White on dark gradients */

    /* Border & Elevation Tokens */
    --border-subtle:         rgba(74, 21, 75, 0.14); /* Clean Aubergine-tinted border line */
    --border-focus:          #4A154B;  /* Focused input / active button state */
    --border-hover:          rgba(74, 21, 75, 0.35);
}
```

---

### 2.2 Typography Scale

```css
:root {
    /* Font Families */
    --font-heading: 'Manrope', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-body:    'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-mono:    'IBM Plex Mono', SFMono-Regular, Menlo, Monaco, monospace;

    /* Type Scale */
    --font-size-xs:   0.75rem;    /* 12px - Monospace tags, status pills, captions */
    --font-size-sm:   0.875rem;   /* 14px - Table data, navigation items, secondary copy */
    --font-size-base: 1rem;       /* 16px - Standard body copy */
    --font-size-md:   1.125rem;   /* 18px - Lead paragraphs, section subtitles */
    --font-size-lg:   1.25rem;    /* 20px - Card headings, modal subsection titles */
    --font-size-xl:   1.5rem;     /* 24px - Section sub-headers, tertiary headers */
    --font-size-2xl:  2rem;       /* 32px - Major section titles */
    --font-size-3xl:  2.5rem;     /* 40px - Page hero headings */
    --font-size-4xl:  3.25rem;    /* 52px - High-impact display headings */

    /* Font Weights */
    --font-weight-regular:   400;
    --font-weight-medium:    500;
    --font-weight-semibold:  600;
    --font-weight-bold:      700;
    --font-weight-extrabold: 800;
}
```

---

### 2.3 Spacing, Borders & Shadows

```css
:root {
    /* Spacing Units */
    --space-2xs: 4px;
    --space-xs:  8px;
    --space-sm:  12px;
    --space-md:  16px;
    --space-lg:  24px;
    --space-xl:  32px;
    --space-2xl: 48px;
    --space-3xl: 64px;
    --space-4xl: 96px;

    /* Border Radii */
    --radius-sm:   6px;
    --radius-md:   10px;
    --radius-lg:   14px;
    --radius-xl:   20px;
    --radius-full: 9999px;

    /* Elevation / Box Shadows */
    --shadow-sm:   0 2px 8px rgba(74, 21, 75, 0.06);
    --shadow-md:   0 8px 24px rgba(74, 21, 75, 0.08), 0 2px 6px rgba(0, 0, 0, 0.03);
    --shadow-lg:   0 16px 40px rgba(74, 21, 75, 0.12), 0 4px 12px rgba(0, 0, 0, 0.04);
}
```

---

## 3. Reusable UI Component Specifications

### 3.1 Button Hierarchy (`components.css`)
1. **Primary Button (`.btn-primary`):**
   - Background: `var(--accent-primary, #4A154B)`
   - Color: `#FFFFFF`
   - Border-Radius: `var(--radius-full)`
   - Hover: `background: #381039`, subtle lift `transform: translateY(-2px)`, shadow glow.
2. **Secondary Button (`.btn-secondary`):**
   - Background: `var(--accent-secondary, #36C5F0)`
   - Color: `var(--color-brand-dark, #2c0a3b)`
   - Hover: `background: #1eade0`, high contrast.
3. **Outline Button (`.btn-outline`):**
   - Background: `transparent`
   - Border: `1px solid var(--border-subtle)`
   - Color: `var(--text-primary)`
   - Hover: `border-color: var(--accent-primary)`, background `rgba(74, 21, 75, 0.05)`.

---

### 3.2 Status Badge System (`platform.css`)
- **Implemented (`.badge-implemented`):** Mint green fill (`#ECFDF5`), emerald border (`#A7F3D0`), forest text (`#065F46`), circular pulse dot.
- **Active Pipeline (`.badge-active`):** Light blue fill (`#EFF6FF`), royal blue border (`#BFDBFE`), navy text (`#1E40AF`).
- **Roadmap / Planned (`.badge-planned`):** Warm gold fill (`#FFFBEB`), amber border (`#FDE68A`), bronze text (`#92400E`).
- **R&D / Research (`.badge-research`):** Lavender fill (`#FAF5FF`), purple border (`#E9D5FF`), deep violet text (`#6B21A8`).

---

### 3.3 Product Hero Banners (`components.css`)
- Container: `.hero-banner-product`
- Background: `linear-gradient(135deg, #4A154B 0%, #6a1b72 50%, #2c0a3b 100%)`
- Border-Bottom: `4px solid var(--accent-secondary)`
- Responsive Heading: `clamp(1.75rem, 4.5vw, 3.5rem)` with `word-break: break-word` preventing mobile character clipping.

---

### 3.4 Responsive Architecture Visualizer (`platform.css`)
- Card: `.arch-layer-card-enterprise`
- 3-Column Desktop Grid: `210px 1fr 140px` (Layer Title & Badge | Description & Chips | Flow Connector).
- 1-Column Responsive Stack below 900px viewport.

---

## 4. Responsive Breakpoint Standards

| Breakpoint Name | Media Query | Target Devices & Form Factors |
| :--- | :--- | :--- |
| **Mobile Compact** | `@media screen and (max-width: 480px)` | iPhone SE, small Android handsets (360px–414px) |
| **Mobile Standard** | `@media screen and (max-width: 768px)` | Standard smartphones, large phablets |
| **Tablet Portrait** | `@media screen and (max-width: 991px)` | iPad Mini, iPad Air, 7-10" tablets |
| **Laptop / Desktop**| `@media screen and (max-width: 1200px)` | MacBooks, 13-15" standard laptops (1366×768) |
| **Large Desktop** | `@media screen and (min-width: 1201px)` | 24-27" enterprise monitors (1920×1080) |

---

## 5. Design Assets for Upcoming Smart City Section (Phase D)

The following components are pre-certified for seamless reuse during Phase D:
1. `hero-banner-product`: Hero container with aubergine gradient and cyan baseline.
2. `arch-layer-card-enterprise`: Architecture layer card for 27-feature tier visualizations.
3. `tech-spec-table`: Tabular data container with responsive horizontal scroll wrapper.
4. `status-badge`: Honest capability labels distinguishing simulation vs. field pilots.
5. `btn-primary` & `btn-secondary`: Standard interactive action triggers.
