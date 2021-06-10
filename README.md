splitter-orchester
===

Website of the [Splitter Orchester](https://splitter.berlin) from Berlin built with React, Next.js, TailwindCSS, TypeScript and Sanity Studio Headless CMS.

## Requirements

* NodeJS 14 or higher
* Sanity Account for Headless CMS
* Vercel Account for deployment (recommended)

## Development

```bash
# Install dependencies
npm install

# Run development servers concurrently. Open localhost:3000 for website,
# localhost:3333 for Sanity CMS backend
npm start

# Check linter errors
npm run lint

# Helper script to generate TypeScript definitions from Sanity schema
npm run sanity:types
```

## Deployment

### Vercel

1. Run `npm run vercel` to initialize and deploy the project, you can alternatively do this through the Vercel web dashboard.
2. After setup you can run the following (optional) commands for deployment:

    ```bash
    # Deploy page on Vercel (optional)
    npm run vercel
    npm run vercel:production
    ```

### Static page hosting

Build and export all files which can be directly used for any static page hosting (without Vercel):

```bash
# Build Next.js and Sanity project
npm run build

# Exports static files to `out` folder (required step)
npm run next:export
```

## License

`UNLICENSED`
