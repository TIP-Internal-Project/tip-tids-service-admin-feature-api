# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application source code
COPY . .

# Expose the port that Cloud Run will use to serve the application
EXPOSE 8080

# Set environment variables (optional, can be set directly in Cloud Run configuration)
# ARG REACT_APP_ENV
# ARG CREDS_JSON
# ARG ENGAGEMENT_APP_KEY_JSON
# RUN echo "$CREDS_JSON" > ./src/creds.json && \
#     echo "$ENGAGEMENT_APP_KEY_JSON" > ./src/engagementAppKey.json

# Command to run the application
CMD [ "npm", "start" ]
