splitter-orchester
===

Website of the Splitter Orchester from Berlin built with `Next.js` and `Sanity`.

## Requirements

* NodeJS 14 or higher

## Development

```bash
# Install dependencies
npm install

# Copy .env.example to .env and adjust variables
cp .env.example .env

# Run development servers concurrently. Open localhost:3000 for website,
# localhost:3333 for Sanity CMS backend
npm start

# Check linter errors
npm run lint

# Deploy page on Vercel
npm run vercel:deploy
npm run vercel:deploy:production
```

## Deployment via Vercel

* Run `npm run vercel` to initialize and deploy the project.
* Make sure to set the [*Development Command*](https://vercel.com/docs/build-step#development-command) in the Build Steps of your Vercel Project to `npm run vercel:dev`.

## License

`UNLICENSED`
