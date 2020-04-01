# [warte.app](https://warte.app)

Especially in a crisis like the _COVID-19 outbreak_, it is important to avoid unnecessary human gatherings,
like in waiting rooms at clinics, doctors or testing facilities. Even without a crisis, it is better to wait at home
and be well informed when the best time to go to a medical facility actually is,
to spend as little time as possible having to wait for your treatment, test or counsel.

## Goal

We want to inform about the current COVID-19 situation and possible future outbreaks.
The main feature though should be finding/discovering medical facilities close to ones position
and be able to enqueue there, without putting extra workload on the medical personel.
To relieve the workforce and inform other patients, users can help by giving information about the situation
at a facility, which the application will use to optimise the queue.

Optionally, the medical facilities can take advantage of the virtual queue and adjust it to their needs,
give out appointments and call patients when it's their turn. To relieve the medical workforce even more, patients can give the facility needed information upfront. 

While waiting for the best possible time to be at the facility, we aim to ease the waiting time,
by integrating with other projects. To cope with times of crisis, we want to integrate with online doctors and psycholigical help centers.

The application should be easily accesible by anyone, therefor we aim towards a [PWA](https://en.wikipedia.org/wiki/Progressive_web_application).

## Development

The [high level technical overview](https://miro.com/app/board/o9J_kuyJbZM=/) is documented in an online collaboration Flowchart.

We use lerna as monorepo setup. Deployment is to separate apps on heroku using [heroku-buildpack-select-subdir](https://elements.heroku.com/buildpacks/pagedraw/heroku-buildpack-select-subdir).

Copy `.env.sample` to `.env`

```bash
yarn install
npx lerna bootstrap
docker-compose -up -d
yarn migrate up
```

When checking out another branch where migrations were added, run `yarn migrate up` again.

### Populate DB

Goto admin-panel (localhost:3003), upload a facilities CSV _(/data/*)_,
then open `https://localhost:8080`

### Tests

We run tests against a real database instance. To create the test database locally:

```bash
yarn test:setup
```

Before you can run the test, you have to apply all migrations to the test database as well with `yarn test:migrate up`.
To run all tests, use `yarn test`from root. To run tests for a specific package, use `yarn test --testPathPattern=packages/frontend`.

## Info

This application was conceived during the #wirvsvirus hackathon from 20th - 22nd of march 2020.
The idea was developed using [an online collaborative Flowchart](https://miro.com/app/board/o9J_kuy0fwM=/).
