FROM node:16-alpine

WORKDIR /usr/app

COPY . .

RUN rm -rf frondend && \
    npm ci --production

EXPOSE 8080

CMD ["npm", "start"]
