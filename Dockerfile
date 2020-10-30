FROM node

RUN mkdir /frontend
WORKDIR /frontend

COPY package.json package-lock.json /frontend/
COPY . /frontend

RUN npm install -g serve
RUN npm install
RUN npm run build
