# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application source code
COPY . .

# Add credentials to the /src directory from environment variables
ARG CREDS_JSON
ARG ENGAGEMENT_APP_KEY_JSON
RUN echo "$CREDS_JSON" > ./src/creds.json
RUN echo "$ENGAGEMENT_APP_KEY_JSON" > ./src/engagementAppKey.json

# Build the application with the environment variable
ARG REACT_APP_ENV=production
RUN npm run build -- --env $REACT_APP_ENV

# Expose the port that your app runs on
EXPOSE 8080

# Command to run the application
CMD [ "node", "bin/www" ]
