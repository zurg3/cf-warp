# docker build -t cf-warp .
# docker run -d -p 8080:8080 cf-warp

FROM node:16-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
ENV PORT=8080
EXPOSE 8080
CMD ["npm", "start"]
