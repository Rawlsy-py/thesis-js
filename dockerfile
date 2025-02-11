# Use the official Node.js 20 image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm ci

# Copy the rest of the app source code to the working directory
COPY . .

# Build the app
RUN npm run build

# Prisma generates the Prisma Client during the build process
RUN npx prisma generate

# Expose the port on which the app will run
EXPOSE 3000

# Start the app
CMD [ "npm", "start" ]