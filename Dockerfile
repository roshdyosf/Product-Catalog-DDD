FROM node:24.13.0 AS base

WORKDIR /app
COPY package*.json .

FROM base AS development
RUN npm install
ARG NODE_ENV
COPY . .
CMD [ "npm", "run", "start-dev" ]
EXPOSE 3000

FROM base AS production
RUN npm ci --omit=dev
ARG NODE_ENV
COPY . .
CMD [ "npm", "run", "start" ]
EXPOSE 3000

