FROM node:20.15.0

WORKDIR /usr/src/app

COPY . .

RUN yarn install

CMD ["yarn", "dev"]

