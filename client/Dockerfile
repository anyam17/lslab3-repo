# Pull Docker Hub base image
FROM node:17.7.1-alpine3.14
# Create working directory
RUN mkdir -p /home/app
# Set working directory
WORKDIR /home/app
# Copy app to container
COPY package*.json ./
# Install app dependencies
RUN npm install
# Copy app to container
COPY . .
# Run the "dev" script in package.json
CMD ["npm", "run", "start"]
