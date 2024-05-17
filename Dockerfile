# build stage 0: "build-stage", based on Node.js, to build and compile the frontend
FROM node:14.21.3 as build-stage

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json .
COPY package-lock.json .
RUN npm install
RUN npm install -g react

COPY . .
RUN npm run build

# build stage 1: based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:stable

COPY nginx.conf.template /etc/nginx/conf.d/default.conf.template
COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY docker-entrypoint.sh /

RUN ["chmod", "+x", "docker-entrypoint.sh"]

EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
