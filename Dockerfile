# Use nginx alpine for a lightweight web server
FROM nginx:alpine

# Copy all HTML, JS files to nginx's default web root
COPY *.html /usr/share/nginx/html/
COPY *.js /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
