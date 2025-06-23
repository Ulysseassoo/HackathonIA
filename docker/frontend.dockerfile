FROM node:24-alpine

WORKDIR /frontend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--port", "3000"]