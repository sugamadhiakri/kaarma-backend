FROM node:14-alpine AS node

# Builder stage

FROM node AS builder

# Use /app as the CWD
WORKDIR /app            

# Copy package.json and package-lock.json to /app
COPY package*.json ./   

# Install all dependencies
RUN npm i               

# Copy the rest of the code
COPY . .                

# Invoke the build script to transpile ts code to js
# RUN npm run build    

# Run development server
ENTRYPOINT [ "ash", "/app/scripts/start-reload.sh" ]


# Final stage

FROM node AS final

# Set node environment to production
ENV NODE_ENV production

# Update the system
RUN apk --no-cache -U upgrade

# Prepare destination directory and ensure user node owns it
# RUN mkdir -p /home/node/app/dist && chown -R node:node /home/node/app
RUN chown -R node:node /home/node/app

# Set CWD
WORKDIR /home/node/app

# Copy package.json, package-lock.json
COPY package*.json ./

# Switch to user node
USER node

# Install libraries as user node
RUN npm i --only=production

# Use PM2 to run the application as stated in config file
ENTRYPOINT [ "ash", "/app/scripts/start.sh" ]