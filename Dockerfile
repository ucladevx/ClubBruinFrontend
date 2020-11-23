FROM node:8.7.0-alpine
RUN mkdir -p /app/server
WORKDIR /app/server
COPY package.json /app/server
RUN npm install --silent
#COPY src /app/server/src
#COPY public /app/server/public
COPY build /app/server/build
COPY server.js /app/server

#RUN npm run build
#RUN npm run build
CMD ["node", "server"]
