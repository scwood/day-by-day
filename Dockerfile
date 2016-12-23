FROM mhart/alpine-node:7.3

EXPOSE 3001

WORKDIR /app

COPY package.json /app/package.json
RUN npm install 

COPY client/package.json /app/client/package.json
RUN cd client && npm install

COPY server/src /app/server/src/
COPY client/src /app/client/src/
COPY client/public /app/client/public/

RUN npm run build

CMD ["npm", "run", "start:production"]
