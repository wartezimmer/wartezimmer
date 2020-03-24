
FROM node:12-alpine

RUN apk update \
    && apk upgrade \
    && apk add curl \
    && mkdir /app/

WORKDIR /app/

COPY package.json yarn.lock ./

RUN yarn install

EXPOSE 3003

CMD ["yarn", "run", "dev"]