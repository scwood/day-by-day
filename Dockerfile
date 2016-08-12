FROM node

EXPOSE 80

WORKDIR /app
ADD . /app

RUN npm install
CMD ["npm", "run", "start:production"]
