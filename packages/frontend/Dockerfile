FROM node:12-alpine

RUN apk update \
    && apk upgrade \
    && apk add curl git \
    && mkdir /app/

WORKDIR /app/

COPY package.json yarn.lock ./

RUN yarn install

COPY src ./src/
COPY .babelrc webpack.config.js ./
COPY tsconfig.docker.json ./tsconfig.json

EXPOSE 443

CMD ["yarn", "run", "start"]

HEALTHCHECK \
    --interval=30s \
    --timeout=5s \
    --start-period=5s\
    --retries=3 \
    CMD curl --fail --silent --show-error http://localhost:80/
