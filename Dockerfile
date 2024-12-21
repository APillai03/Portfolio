FROM node:22-alpine

# Set the working directory for the client app
WORKDIR /app/client

# Copy client package.json and install dependencies
COPY client/package*.json ./
RUN npm install

# Set the working directory for the server app
WORKDIR /app/server

# Copy server package.json and install dependencies
COPY server/package*.json ./

RUN npm install

# Copy all the other files into the container
COPY . .

# Expose the necessary port
EXPOSE 7869

# Set the working directory to the server directory
WORKDIR /app/server



# Run the server.js file
CMD ["npm", "start"]
