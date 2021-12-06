FROM node:16-alpine

WORKDIR /usr/app

COPY . .

RUN npm ci --production

CMD ["npm", "start"]