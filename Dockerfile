FROM node:14-alpine

EXPOSE 3001

WORKDIR /usr/src/app

COPY package.json package-lock.json* ./ 

RUN npm install && npm cache clean --force

COPY . .

CMD [ "node", "./bin/www"]

RUN apk add --update curl