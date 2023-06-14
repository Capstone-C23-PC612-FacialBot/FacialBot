# Use the official Node.js 14 image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Install Python 3
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y python3

# Install PIP
RUN curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
RUN python3 get-pip.py

# Install Dependencies for app.py
RUN pip3 install --upgrade pip
COPY requirements.txt .
RUN pip3 install -r requirements.txt

# Copy the server files to the working directory
COPY . .

# Expose the port your server listens on
EXPOSE 3000
EXPOSE 5000
ENV PORT 3000
ENV HOST 0.0.0.0

# Start the server when the container is run
CMD ["node", "server.js"]
