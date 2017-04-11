FROM node:7.8

WORKDIR /backend

RUN npm install -g nodemon

COPY backend/package.json /backend/package.json
RUN npm install
RUN mv /backend/node_modules /node_modules

COPY . /backend

EXPOSE 8020
CMD [ "npm", "start" ]
