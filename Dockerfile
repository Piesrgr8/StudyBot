FROM node:19
EXPOSE 3333
WORKDIR /app
VOLUME /app
CMD npm i && node index.js