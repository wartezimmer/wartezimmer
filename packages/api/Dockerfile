
FROM node:12-alpine

RUN apk update \
    && apk upgrade \
    && apk add curl \
    && mkdir /app/

WORKDIR /app/

RUN mkdir lib

COPY package.json yarn.lock ./

RUN yarn install

EXPOSE 3003

CMD ["node", "--inspect=0.0.0.0:9227", "./node_modules/.bin/ts-node", "--files", "-P", "tsconfig.json" "src/app.ts"]