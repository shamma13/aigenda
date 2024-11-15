FROM node:20.9.0

WORKDIR ../ai-genda

COPY ./package*.json ./

RUN npm ci

COPY . .

RUN npm run build

RUN npm run test

EXPOSE 3000

CMD ["npm", "run", "start"]