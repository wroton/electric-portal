FROM node:10-alpine as build-stage
ARG env=dev
WORKDIR /src

COPY ./package.json /src/package.json
RUN npm install

COPY . ./src

RUN npm run build --mode $env

FROM nginx:1.16-alpine as production-stage
COPY --from=build-stage /src/dist /var/www
COPY --from=build-stage /src/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443