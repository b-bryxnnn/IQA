FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the Vite frontend
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the Node.js Express server
CMD ["npm", "run", "server"]
