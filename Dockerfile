FROM nginx:alpine

# Copy all static files to the Nginx html directory
COPY . /usr/share/nginx/html

# Expose port 80 inside the container
EXPOSE 80
