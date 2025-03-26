# 📦 Base image for Node.js
FROM node:18-alpine

# 📁 Set working directory
WORKDIR /app

# 📄 Copy package files & install deps
COPY package*.json ./
RUN npm install

# 📦 Copy rest of the code
COPY . .

# 🚪 Expose the backend port
EXPOSE 5001

# 🏃 Start the server
CMD ["npm", "start"]
