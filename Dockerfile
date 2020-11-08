FROM node:8.7.0-alpine
RUN mkdir -p /app/server
WORKDIR /app/server

COPY package.json /app/server

RUN npm install

RUN npm build

COPY src /app/server/src
COPY public /app/server/public
COPY server.js /app/server

RUN npm run build

CMD ["node", "server"]%
