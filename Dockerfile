FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm ci

RUN apt-get update && apt-get install -y postgresql-client

RUN npm install -g @medusajs/medusa-cli@latest

COPY . .

RUN chmod +x ./develop.sh

ENTRYPOINT ["./develop.sh"]