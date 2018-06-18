FROM node:8.11.2-alpine
EXPOSE 3000 9229
COPY . home/app
WORKDIR /home/app
RUN npm install
CMD npm start
