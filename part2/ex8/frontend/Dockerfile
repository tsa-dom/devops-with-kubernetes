FROM node:16-alpine AS build

WORKDIR /usr/app

COPY . .

ENV REACT_APP_API_URI=http://localhost:8081

RUN npm ci --production && \
    npm run build

FROM nginx:1.21.4-alpine

COPY --from=build /usr/app/build/ /usr/share/nginx/html

EXPOSE 80