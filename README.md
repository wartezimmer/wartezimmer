# wartezimmer

We use lerna as monorepor setup. Deployment is to separate apps on heroku using [heroku-buildpack-select-subdir](https://elements.heroku.com/buildpacks/pagedraw/heroku-buildpack-select-subdir).

# Dev

```bash
yarn install
npx lerna bootstrap
```

### API Service
```bash
yarn start-api
```

GOTO: `localhost:3001`