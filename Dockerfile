FROM node:alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY public/ ./public
COPY index.js ./index.js

CMD ["node", "index.js"]
