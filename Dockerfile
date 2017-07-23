FROM node:8.2-alpine

RUN mkdir /app
WORKDIR /app
COPY . .

RUN npm install pm2 -g
RUN npm install

EXPOSE 3000

CMD ["pm2-docker", "--json", "start", "pm2.json"]