FROM node:24.13.0

WORKDIR /app
COPY package.json .

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "production" ]; then \
    npm ci --only=production; \
else \
    npm install; \
fi  


COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start-dev" ]