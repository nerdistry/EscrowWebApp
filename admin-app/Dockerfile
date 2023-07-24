FROM node:12

WORKDIR /app

COPY admin-app/package*.json ./

RUN npm install

COPY admin-app/ ./

ENV PORT=8081

EXPOSE 8081

CMD [ "npm", "start" ]
