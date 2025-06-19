# Use Node 18 (LTS)
FROM node:22

# Create app directory
WORKDIR /app

# Install system dependencies
RUN apk add --no-cache bash

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy all project files
COPY . .

# Build Medusa project
RUN npm run build

# Expose the Medusa port
EXPOSE 9000

# Start Medusa in production
CMD ["npm", "run", "start"]
