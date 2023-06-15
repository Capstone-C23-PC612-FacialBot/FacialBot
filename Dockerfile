# Use the official Node.js 14 image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the server files to the working directory
COPY . .

# Expose the port your server listens on
EXPOSE 3000
ENV PORT 3000
ENV HOST 0.0.0.0

# Start the server when the container is run
CMD ["node", "server.js"]
