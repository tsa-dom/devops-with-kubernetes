FROM node:16-alpine AS build

WORKDIR /usr/app

COPY ./frontend .

RUN npm ci --production && \
    npm run build

FROM node:16-alpine

WORKDIR /urs/app

COPY . .
COPY --from=build /usr/app/build /usr/app/build

RUN rm -rf frondend && \
    npm ci --production

EXPOSE 8080

CMD ["npm", "start"]
