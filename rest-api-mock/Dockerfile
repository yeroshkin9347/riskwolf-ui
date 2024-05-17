FROM node:16 as build-stage

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .
RUN npm run test

# run stage
FROM pactfoundation/pact-stub-server

COPY --from=build-stage /app/pacts /pacts

EXPOSE 8080

WORKDIR /app

ENTRYPOINT ["./pact-stub-server" , "-d", "/pacts", "-p", "8080"]
