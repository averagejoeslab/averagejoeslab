# Use Node.js 18 Alpine for smaller size and better security
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Expose port 3000
EXPOSE 3000

# Start development server
CMD ["npm", "start", "--", "--host", "0.0.0.0"]