FROM mhart/alpine-node:7.3

EXPOSE 3001

WORKDIR /app

COPY package.json /app/package.json
RUN npm install 

COPY client/package.json /app/client/package.json
RUN cd client && npm install

COPY server/src /app/server/
COPY client/src client/public /app/client/
RUN npm run build

CMD ["npm", "run", "start:production"]
