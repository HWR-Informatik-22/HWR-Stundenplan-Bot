FROM node:16 as production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5151

CMD [ "node", "dist/main.js" ]