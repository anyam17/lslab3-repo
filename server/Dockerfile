# Pull Node Js from Docker Hub. Alphine is a lightweigh O.S
FROM node:17.8.0-alpine3.14

# Create working directory
RUN mkdir -p /home/app

# Set working directory
WORKDIR /home/app

# Copy application dependency files (package.json) to container For better caching
COPY package*.json ./

# Install app dependencies in container
RUN npm install

# Copy application from current directory to container's current directory.
COPY . .

# For best practices, do not run a container as root user.
# Node Js comes with a user called node, so use this user instead.
# Setting ownership and permission.
# RUN groupadd -r myuser && useradd -g myuser myuser
# # Setting ownership and permission.
# RUN chown -R myuser:myuser /home/app
# # switch to node user
# USER myuser

# Run the application as specified in script in package.json
CMD ["npm", "run", "server"]
