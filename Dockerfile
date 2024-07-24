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
ARG NODE_ENV
ARG CREDS_JSON
ARG ENGAGEMENT_APP_KEY_JSON
ENV NODE_ENV=${NODE_ENV}

# Decode and write JSON files
RUN echo "$CREDS_JSON" | base64 -d > ./src/creds.json && \
    echo "$ENGAGEMENT_APP_KEY_JSON" | base64 -d > ./src/engagementAppKey.json && \
    # Debug output to check file content
    cat ./src/creds.json && \
    cat ./src/engagementAppKey.json

# Expose the port that Cloud Run will use to serve the application
EXPOSE 8080

# Command to run the application
CMD [ "npm", "start" ]
