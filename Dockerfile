


FROM nginx:latest

WORKDIR /etc/nginx
ADD nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]