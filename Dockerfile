#use a Node.js base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code to the container
COPY . .
EXPOSE 3000

# start the React app
CMD ["npm", "start"]