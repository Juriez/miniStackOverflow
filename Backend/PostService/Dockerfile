FROM node:alpine

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 8001
EXPOSE 8002

# Define the command to run the application
CMD ["node", "server.js"]
