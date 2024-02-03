FROM node:alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn

ENV NODE_OPTIONS=--max-old-space-size=8192

EXPOSE 5173