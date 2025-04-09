FROM node:latest as debug

WORKDIR /work/

COPY ./package.json /work/package.json
RUN npm install

ADD ./ /work/src/
WORKDIR /work/src/
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]; 