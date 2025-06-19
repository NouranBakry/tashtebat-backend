# Dockerfile
FROM node:22

WORKDIR /app

COPY . .

RUN npm install

WORKDIR .medusa/server

RUN npm install && npm run build

CMD ["npm", "run", "start"]
