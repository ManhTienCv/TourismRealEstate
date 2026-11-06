# TIE — Productized Architecture & PropTech Platform

[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg)](https://reactjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10.3-ea2845.svg)](https://nestjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791.svg)](https://www.postgresql.org/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-5.14-2d3748.svg)](https://www.prisma.io/)

> **TIE** is an architectural PropTech platform delivering pre-engineered modular homes with fixed pro-forma pricing, interactive 5-step configuration, and 6-stage digital field construction tracking. Inspired by Huts.com's warm editorial minimalism and consultative e-commerce flow.

---

## 1. Brand & Design System (TIE Warm Editorial Palette)

Never uses cold pure whites or generic Tailwind blues. Built on warm architectural paper tones and forest greens:

| Token | Hex | Role | Usage |
| :--- | :--- | :--- | :--- |
| `bg-tie-bg` | `#F7F5F0` | Warm Alabaster Paper | Primary page background |
| `bg-tie-surface` | `#EFECE6` | Architectural Card Surface | Secondary cards, sections, header |
| `border-tie-border` | `#E2DDD5` | Hairline Rule | Delicate architectural separator borders |
| `text-tie-ink` | `#1C1B18` | Deep Charcoal Ink | Primary typography & headings |
| `text-tie-muted` | `#68645E` | Warm Graphite | Secondary body copy & descriptions |
| `bg-tie-pine` | `#2C4A3E` | Nordic Pine Green | Primary CTA buttons, active state, links |
| `bg-tie-terracotta` | `#D46A43` | Terracotta Brick | Cost variance badges, active status pills |

### Typography Hierarchy
- **Editorial Serif** (`Playfair Display`, `Instrument Serif`): Hero titles, section headings, numbers.
- **Modern Sans** (`Plus Jakarta Sans`): Body text, forms, navigation.
- **Architectural Monospace** (`JetBrains Mono`): Sqft, Bed/Bath pills, pro-forma financial items, stage codes.

---

## 2. Core Domain Terminology

1. **`HousingSolution` (8 Buyer Archetypes)**:
   - *The Modern Starter* (280k–480k)
   - *The Forever Sanctuary* (540k–920k)
   - *The Weekend Retreat* (350k–620k)
   - *The Work/Live Hybrid* (420k–710k)
   - *The Backyard ADU* (210k–340k)
   - *The Yield Portfolio Asset* (380k–680k)
   - *Micro-Hospitality Outpost* (650k–1.85M)
   - *The Multi-Gen Family Compound* (890k–1.65M)

2. **`StandardPlan` (8 Modular Base Architectural Designs)**:
   - `TIE ADU 480` (480 sqft &bull; 1 Module)
   - `Small Bar 640` (640 sqft &bull; 2 Modules)
   - `Medium Bar 1100` (1,100 sqft &bull; 2 Modules)
   - `Big Bar 1650` (1,650 sqft &bull; 3 Modules)
   - `Catskills Dogtrot 1850` (1,850 sqft &bull; 4 Modules &bull; Breezeway)
   - `Courtyard Small L 1350` (1,350 sqft &bull; 3 Modules)
   - `Panorama Big L 2200` (2,200 sqft &bull; 4 Modules)
   - `The Village Compound 3200` (3,200 sqft &bull; 6 Modules &bull; 3 Pavilions)
   - **Dual-Image Assets**: Default photographic exterior view seamlessly transitions on hover to clean 3D axonometric diagram on white background.

3. **`PortfolioProject` (Realized Architectural Case Studies)**:
   - Real-world builds (Woodstock NY, Rhinebeck NY, Healdsburg CA, Great Barrington MA).
   - Cross-linked to both a `StandardPlan` and a `HousingSolution`.
   - Realized turnkey costs, delivery timeline in months, client quotes, and specifications.

4. **`ProjectEstimate` (Interactive Pro-Forma Configurator)**:
   - 5-step consultative configuration flow.
   - Calculates real-time Pro-Forma: Hard Cost + Site Prep Cost + Soft Cost + 5% Contingency Buffer.
   - Stores custom options and full calculation output into PostgreSQL `JSONB`.

5. **`FieldReportProject` (6-Stage Construction Progress Tracker)**:
   - Client portal tracking ongoing builds in real time.
   - 6 standard stages:
     1. Feasibility, Survey & Engineering Permitting
     2. Site Prep & Foundation Pour
     3. Offsite Precision Factory Fabrication
     4. Module Transport & Crane Set
     5. Interior & Exterior Architectural Fit-Out
     6. Commissioning, Blower Door Test (<0.6 ACH50) & Handover
   - Includes site weather station, milestone checklist, weekly photo logs, torque certifications.

---

## 3. Monorepo Architecture

```
TourismRealEstate/
├── packages/
│   └── shared/              # @tie/shared (Domain types, enums, Pro-Forma calculator, seed data)
├── apps/
│   ├── api/                 # @tie/api (NestJS, Swagger, Prisma ORM, JSONB storage)
│   └── web/                 # @tie/web (React 18, Vite, Tailwind CSS, Zustand, Framer Motion)
├── package.json             # Root npm workspaces configuration
└── README.md
```

---

## 4. Getting Started

### Prerequisites
- Node.js 18+ (tested on Node 24)
- PostgreSQL 16 (database: `tie_proptech_db`)

### Installation & Development
```bash
# Install dependencies
npm install

# Build shared package
npm run build --workspace=@tie/shared

# Run NestJS API backend (http://localhost:3001)
npm run start:dev --workspace=@tie/api

# Run React Frontend (http://localhost:3000)
npm run dev --workspace=@tie/web
```

### Swagger Documentation
Once the API is running, visit:
**`http://localhost:3001/api/docs`**
