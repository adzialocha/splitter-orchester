splitter-orchester
===

Website of the [Splitter Orchester](https://splitter.berlin) from Berlin built with React, Next.js, TailwindCSS, TypeScript and Sanity Studio Headless CMS.

## Requirements

* NodeJS 14 or higher
* yarn
* Sanity Account for Headless CMS
* Vercel Account for deployment (recommended)

## Development

```bash
# Install dependencies
yarn

# Run development servers concurrently. Open localhost:3000 for website,
# localhost:3333 for Sanity CMS backend
yarn start

# Check linter errors
yarn lint

# Helper script to generate TypeScript definitions from Sanity schema
yarn sanity:types
```

## Deployment

### Vercel

1. Run `yarn vercel` to initialize and deploy the project, you can alternatively do this through the Vercel web dashboard.
2. After setup you can run the following (optional) commands for deployment:

    ```bash
    # Deploy page on Vercel (optional)
    yarn vercel
    yarn vercel:production
    ```

### Static page hosting

Build and export all files which can be directly used for any static page hosting (without Vercel):

```bash
# Build Next.js and Sanity project
yarn build

# Exports static files to `out` folder (required step)
yarn next:export
```
