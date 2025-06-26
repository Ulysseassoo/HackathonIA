FROM node:24-alpine

WORKDIR /backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE ${NEST_PORT}

CMD ["npm", "run", "start:dev", "--", "--host", "0.0.0.0", "--port", "${NEST_PORT}"]