# Use a lightweight web server to serve static files
FROM nginx:alpine

# Copy build folder to NGINX's default web folder
COPY build/ /usr/share/nginx/html

# Expose port 80 (default web port)
EXPOSE 80

# Start the NGINX web server
CMD ["nginx", "-g", "daemon off;"]
