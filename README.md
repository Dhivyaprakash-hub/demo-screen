# Wellnest Catalog

A responsive, accessible product discovery experience built with React 19 and Vite. The catalog uses fictional sample listings to demonstrate practical storefront interactions without claiming to sell medical products or provide health advice.

**[Open the live demo](https://demo-screen-ivory.vercel.app)**

## What you can do

- Search listings and filter by category or maximum price.
- Sort by featured order, price, or rating.
- Save favourites in this browser for a later visit.
- Compare up to three listings side by side.
- Open an accessible detail view with product specifications.
- Use the layout on desktop, tablet, or mobile; respect reduced-motion preferences.

All catalog information is illustrative. There is no checkout, account system, inventory service, or medical recommendation.

## Run locally

Requires Node.js 22.12+ (or 20.19+) and npm.

```bash
npm install
npm run dev
```

Create a production build with `npm run build`; preview it locally with `npm run preview`.

## Hosting

The app is a static client-side build and can be hosted on Vercel, Cloudflare Pages, or another static CDN. No paid service or secret environment variable is required. The current Vercel deployment is configured to rebuild from the repository's default branch.

## Stack

- React 19
- Vite 8
- CSS with responsive layout, keyboard focus states, and reduced-motion support
