FROM node:16-alpine

COPY . .

RUN npm ci --production

EXPOSE 8080

CMD ["npm", "start"]