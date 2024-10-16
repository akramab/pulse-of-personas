# Use an official node image as the base image
FROM node:16-alpine

# Create a non-root user and group
RUN addgroup -S nodegroup && adduser -S nodeuser -G nodegroup

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install project dependencies
RUN npm install

# Change ownership of the app directory (including node_modules) to the non-root user
RUN chown -R nodeuser:nodegroup /app

# Copy the entire project to the working directory
COPY . .

# Switch to the non-root user
USER nodeuser

# Expose port 3000
EXPOSE 3000

# Start the app using react-scripts start
CMD ["npm", "start"]
