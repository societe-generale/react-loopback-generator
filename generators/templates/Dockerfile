FROM node:6

COPY . /code
WORKDIR /code

RUN npm install -g yarnpkg

RUN yarn install

CMD node .
