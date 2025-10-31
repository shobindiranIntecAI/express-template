# Step 1: Use official Node.js image
FROM node:22-alpine

# Step 2: Set working directory inside container
WORKDIR /

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy source files
COPY . .

# Step 6: Build TypeScript
RUN npm run build

# Step 7: Set NODE_ENV for production and enable TypeScript path mapping
ENV NODE_ENV=development
ENV PORT=3004

# Step 8: Expose port (same as your server listens on, e.g., 3000)
EXPOSE 3004

# Step 9: Command to run the server with module-alias/register for @/ support
CMD ["node", "build/index.js"]