FROM node:24-alpine AS builder

WORKDIR /app
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile
COPY ./ /app/
RUN yarn build

FROM nginxinc/nginx-unprivileged:1.27-alpine

COPY config/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build/ /usr/share/nginx/html

EXPOSE 8080
STOPSIGNAL SIGTERM
CMD ["nginx", "-g", "daemon off;"]
