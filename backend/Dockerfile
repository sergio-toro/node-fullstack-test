FROM node:7.8

WORKDIR /backend

RUN npm install -g nodemon

COPY backend/package.json /backend/package.json
RUN yarn install

COPY . /backend

EXPOSE 8020
CMD [ "npm", "start" ]
