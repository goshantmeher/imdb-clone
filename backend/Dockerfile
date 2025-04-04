#local debug config
FROM node:21-alpine as debug

WORKDIR /work/
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build
WORKDIR /work/dist/
CMD [ "npm", "run", "start" ]

