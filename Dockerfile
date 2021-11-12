FROM node:16-slim

WORKDIR /usr/src/app

COPY package.json package-lock*.json ./

RUN npm install i npm@latest -g

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
