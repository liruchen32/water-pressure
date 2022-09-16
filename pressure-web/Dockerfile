FROM node:16.13.2-alpine

WORKDIR /

COPY package*.json /
RUN npm install -g @vue/cli@latest
RUN npm install

COPY . .

EXPOSE 80
CMD [ "npm", "run", "serve" ]