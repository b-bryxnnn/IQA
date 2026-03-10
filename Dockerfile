FROM node:20-slim

# Install OpenSSL (Required by Prisma)
RUN apt-get update -y && apt-get install -y openssl procps

# Set working directory
WORKDIR /app

# Copy package.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Remove prisma.config.ts to avoid tsx requirement in production
RUN rm -f prisma.config.ts || true

# Generate Prisma Client
RUN npx prisma generate

# Build the Vite frontend
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the Node.js Express server
CMD ["npm", "run", "server"]
