FROM node
MAINTAINER Spencer Wood <spencercwood@gmail.com>

WORKDIR /app

COPY package.json /app/package.json
RUN npm install

COPY client/package.json /app/client/package.json
RUN cd client
RUN npm install
RUN cd ..

COPY . /app
RUN npm run build

# NEED TO INSTALL NODE MODULES IN CLINET

EXPOSE 3001
ENV NODE_ENV production
CMD ["npm", "run", "start:production"]
