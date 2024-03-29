
FROM node:16.14.0-alpine

RUN mkdir -p /app

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "start:dev"]