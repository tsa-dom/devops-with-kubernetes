FROM node:alpine

WORKDIR /workspace

COPY package* ./

RUN npm ci

COPY . .

CMD ["npm", "start"]