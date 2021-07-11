FROM node:14-alpine AS builder

# Install client dependencies
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install --quiet

# Build client
COPY . /app/
RUN npm run build

FROM nginx:1.21-alpine-perl

# Install module for Nginx
RUN apk add --no-cache nginx-mod-http-perl

COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/web.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
