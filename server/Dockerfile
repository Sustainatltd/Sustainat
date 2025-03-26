# 📦 1. Use an official lightweight Node.js image (based on Alpine Linux)
FROM node:18-alpine

# 📁 2. Set the working directory inside the container
WORKDIR /app

# 📄 3. Copy only package.json and package-lock.json to install dependencies
COPY package*.json ./

# 📦 4. Install backend dependencies (express, mongoose, etc.)
RUN npm install

# 📂 5. Copy the rest of your backend code (routes, controllers, server.js, etc.)
COPY . .

# 🚪 6. Expose port 5001 so it can be mapped outside the container (used by frontend, Kubernetes, etc.)
EXPOSE 5001

# 🏃 7. Start the Node.js backend using npm start (as defined in package.json)
CMD ["npm", "start"]
