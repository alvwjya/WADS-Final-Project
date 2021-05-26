
FROM nginx:latest
WORKDIR /
ADD nginx.conf /etc/nginx/nginx.conf

COPY /build /usr/share/nginx/html