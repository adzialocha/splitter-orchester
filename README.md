# splitter-orchester

Website of the [Splitter Orchester](https://splitter.berlin) from Berlin built with React, Next.js, TailwindCSS, TypeScript and Sanity Studio Headless CMS.

## Requirements

- Node.js 22 or higher
- PNPM 10 or higher
- Sanity Account for Headless CMS
- Vercel Account for deployment (recommended)

## Development

```bash
# Install dependencies
pnpm install

# Run development servers concurrently. Open localhost:3000 for website,
# localhost:3333 for Sanity CMS backend
pnpm start

# Run individual services
pnpm next:start    # Next.js frontend only
pnpm sanity:start  # Sanity Studio only

# Check linter errors
pnpm lint

# Type check
pnpm tsc

# Helper script to generate TypeScript definitions from Sanity schema
pnpm sanity:types
```

## Deployment

### Vercel

1. Run `pnpm vercel` to initialize and deploy the project, you can alternatively do this through the Vercel web dashboard.
2. After setup you can run the following (optional) commands for deployment:

   ```bash
   # Deploy page on Vercel (optional)
   pnpm vercel
   pnpm vercel:production
   ```

### Static page hosting

Build and export all files which can be directly used for any static page hosting (without Vercel):

```bash
# Build Next.js and Sanity project
pnpm build

# Exports static files to `out` folder (required step)
pnpm next:export
```
