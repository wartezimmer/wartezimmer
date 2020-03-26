# Warteschleife (wartezimmer)

We use lerna as monorepo setup. Deployment is to separate apps on heroku using [heroku-buildpack-select-subdir](https://elements.heroku.com/buildpacks/pagedraw/heroku-buildpack-select-subdir).

## Dev

Copy `.env.sample` to `.env`

```bash
yarn install
npx lerna bootstrap
docker-compose -up -d
yarn migrate up
```

When checking out another branch where migrations where changed, run `yarn migrate up` again.

### Populate DB

Goto admin-panel (localhost:3003), upload a facilities CSV (/data/*).
GOTO: `https://localhost:8080`
