# Base image
FROM node:18

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package.json yarn.lock ./

# Install app dependencies
RUN yarn install

# Bundle app source
COPY src /app/src/
COPY migrations /app/migrations/
COPY tsconfig.json .
COPY tsconfig.build.json .
COPY test /app/test/

COPY .docker.env .env

# Creates a "dist" folder with the production build
RUN yarn build

ENV NODE_OPTIONS=--max-old-space-size=8192

# Expose the port on which the app will run
EXPOSE 3000