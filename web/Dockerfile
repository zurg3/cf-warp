FROM node:20-alpine AS build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app .
ENV PORT=8080
EXPOSE 8080
CMD ["server.js"]
