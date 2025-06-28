# Use an official Node.js image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy only package files first for better caching
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the app
COPY . .

RUN yarn build

# Expose the port your app runs on (optional but good practice)
EXPOSE 9000

# Start the app
CMD ["npm", "run", "start"]
