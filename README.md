# wartezimmer

We use lerna as monorepor setup. Deployment is to separate apps on heroku using [heroku-buildpack-select-subdir](https://elements.heroku.com/buildpacks/pagedraw/heroku-buildpack-select-subdir).

## Dev

Copy `.env.sample` to `.env`

```bash
yarn install
npx lerna bootstrap
docker-compose -up -d
yarn migrate:up
```

GOTO: `localhost:8080`
