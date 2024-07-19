FROM node:14-alpine

EXPOSE 3001 80

WORKDIR /usr/src/app

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

RUN apk add --update curl

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s \
  CMD curl -fs http://localhost:80/ || exit 1

CMD [ "node", "./bin/www"]