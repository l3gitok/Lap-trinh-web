
FROM node:20.17.0-bullseye


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


RUN npm run build


RUN npm install -g serve


CMD ["serve", "-s", "build"]


EXPOSE 3000