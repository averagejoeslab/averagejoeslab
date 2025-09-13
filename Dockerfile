# Use Node.js 18 Alpine for smaller image size and better security
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Create a non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S docusaurus -u 1001

# Copy package files first for better Docker layer caching
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production=false && \
    npm cache clean --force

# Copy the rest of the application code
COPY . .

# Change ownership to non-root user
RUN chown -R docusaurus:nodejs /app

# Switch to non-root user
USER docusaurus

# Expose the port Docusaurus runs on
EXPOSE 3000

# Start the development server
CMD ["npm", "start", "--", "--host", "0.0.0.0", "--poll"]
