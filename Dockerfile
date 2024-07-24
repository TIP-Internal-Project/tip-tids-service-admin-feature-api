# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application source code
COPY . .

# Add environment-specific credentials to the /src directory
ARG REACT_APP_ENV
ARG CREDS_JSON
ARG ENGAGEMENT_APP_KEY_JSON
RUN echo "$CREDS_JSON" > ./src/creds.json && \
    echo "$ENGAGEMENT_APP_KEY_JSON" > ./src/engagementAppKey.json

# Expose the port that your app runs on
EXPOSE 8080

# Command to run the application
CMD [ "node", "bin/www" ]
