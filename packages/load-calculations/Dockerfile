  
FROM node:12-alpine

RUN apk update \
    && apk upgrade \
    && apk add curl \
    && mkdir /app/

WORKDIR /app/

CMD mkdir lib

COPY package.json yarn.lock ./

RUN yarn install

EXPOSE 3002


CMD ["node", "--inspect=0.0.0.0:9228", "worker.js"]