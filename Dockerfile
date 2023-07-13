# build stage
FROM node:lts-alpine as build-stage
ENV NODE_OPTIONS="--openssl-legacy-provider"
ENV NODE_OPTIONS="--max-old-space-size=2048"
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY docker/nginx/default.conf /temp/default.conf
RUN envsubst /app < /temp/default.conf > /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]