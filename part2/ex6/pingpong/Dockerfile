FROM node:16-alpine

COPY . .

RUN npm ci --production

EXPOSE 5000

CMD ["npm", "start"]