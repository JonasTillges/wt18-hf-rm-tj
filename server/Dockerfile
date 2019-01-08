FROM node

WORKDIR /usr/src/app

ADD package.json .

RUN npm install

ADD . .

EXPOSE 8081

CMD ["node", "src/server.js"]
