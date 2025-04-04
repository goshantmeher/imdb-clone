#local debug config
FROM node:21-alpine as debug

WORKDIR /work/
COPY . /work/.
RUN npm install
RUN npm run build
COPY ./dist/ /work/src/
WORKDIR /work/src/
CMD [ "npm", "run", "start" ]

