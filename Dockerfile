# Use Node.js 18 Alpine for smaller size and better security
FROM node:18-alpine

# Create a non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S docusaurus -u 1001 -G nodejs

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies as root, then clean up
RUN npm ci --only=production=false && \
    npm cache clean --force

# Copy source code
COPY . .

# Change ownership of app directory to non-root user
RUN chown -R docusaurus:nodejs /app

# Switch to non-root user
USER docusaurus

# Expose port 3000
EXPOSE 3000

# Start development server
CMD ["npm", "start", "--", "--host", "0.0.0.0"]