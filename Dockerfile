FROM node:22

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the application
COPY . .

# Build the app (includes admin if configured)
RUN npm run build

# Expose Medusa port
EXPOSE 9000

# Start the Medusa backend
CMD bash -c "npx medusa db:migrate && npx medusa start"
