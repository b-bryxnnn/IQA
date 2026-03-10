FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy all static files to the Nginx html directory
COPY . /usr/share/nginx/html

# Expose port 80 inside the container
EXPOSE 80
