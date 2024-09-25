FROM node:18.20.4-alpine3.20

COPY . .

RUN npm i


EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]