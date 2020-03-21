  
FROM node:12-alpine

RUN apk update \
    && apk upgrade \
    && apk add curl \
    && mkdir /app/

WORKDIR /app/

CMD mkdir lib

COPY package.json yarn.lock ./

RUN yarn install

EXPOSE 3001


CMD ["node", "--inspect=0.0.0.0:9229", "server.js"]