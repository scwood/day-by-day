FROM node
MAINTAINER Spencer Wood <spencercwood@gmail.com>

WORKDIR /app

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
RUN npm install -g yarn
RUN yarn

COPY server /app/server
COPY client /app/client
RUN npm run build

EXPOSE 3001
ENV NODE_ENV production
CMD ["npm", "run", "start:production"]
