# Mano Rehabilitation Centre Frontend

Production-ready Next.js App Router frontend for a clinic website.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- ESLint

## Scripts

- npm run dev: start local development server
- npm run lint: run lint checks
- npm run build: create production build
- npm run start: run production server

## Folder Structure

```text
app/
  about-us/
    page.tsx
  blog/
    page.tsx
  components/
    contact/
      AppointmentForm.tsx
      ContactDetails.tsx
    layout/
      FloatingContact.tsx
      Footer.tsx
      Navbar.tsx
      index.ts
    sections/
      home/
        About.tsx
        Blog.tsx
        Hero.tsx
        Services.tsx
        Testimonials.tsx
        WhyUs.tsx
        index.ts
    shared/
      PageHero.tsx
  contact/
    page.tsx
  data/
    services.ts
  navigation/
    links.ts
    routes.ts
  services/
    page.tsx
  globals.css
  layout.tsx
  page.tsx
public/
```

## Architecture Notes

- Reusable UI is grouped by domain under app/components.
- Route paths are centralized in app/navigation/routes.ts.
- Nav and legal links are centralized in app/navigation/links.ts.
- Home sections are exported via app/components/sections/home/index.ts.
- Shared page headers use app/components/shared/PageHero.tsx.
- Contact page is split into reusable subcomponents for maintainability.

## Production Readiness Checklist

- Route constants and links are centralized (no hardcoded duplication).
- Reusable components are organized by feature/layout/shared boundaries.
- Lint and production build pass successfully.