# ✅ First stage: Build React app
FROM node:18-alpine AS builder

# 📁 Set working directory
WORKDIR /app

# 📦 Install dependencies
COPY package*.json ./
RUN npm install

# 📁 Copy source code
COPY . .

# 🛠️ Build production version of React app
RUN npm run build


# ✅ Second stage: Serve using NGINX
FROM nginx:alpine

# 🧹 Clean the default NGINX public directory
RUN rm -rf /usr/share/nginx/html/*

# 📂 Copy built files from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# ⚙️ Copy custom nginx config to handle React routes
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 🚪 Expose port 80 for traffic
EXPOSE 80

# 🚀 Start NGINX
CMD ["nginx", "-g", "daemon off;"]
