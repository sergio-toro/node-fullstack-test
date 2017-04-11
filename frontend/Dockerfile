FROM node:6.10

WORKDIR /frontend

COPY frontend/package.json /frontend/package.json
RUN yarn install

COPY . /frontend

EXPOSE 8050
CMD [ "npm", "start" ]
