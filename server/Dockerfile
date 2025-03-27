# -------------------------------
# 🐳 Base image with Node.js
# -------------------------------
    FROM node:18-alpine

    # 📁 Set working directory inside the container
    WORKDIR /app
    
    # 📦 Copy package.json and lock file (helps with faster install)
    COPY package*.json ./
    
    # 📥 Install all backend dependencies
    RUN npm install
    
    # 📂 Copy the rest of your backend files (like server.js, routes/, models/, etc.)
    COPY . .
    
    # 🚪 Tell Docker to expose this port (our app listens here)
    EXPOSE 5001
    
    # 🚀 Start the app (runs server.js using command in package.json)
    CMD ["npm", "start"]
    