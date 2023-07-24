FROM node:12

WORKDIR /app

COPY frontend_other/package*.json ./

RUN npm install

COPY frontend/ ./

ENV PORT=8082

EXPOSE 8082

CMD [ "npm", "start" ]
