FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN yarn install


COPY . .

EXPOSE 8000

ENV SWOP_API_KEY=${SWOP_API_KEY}
ENV SWOP_URL=${SWOP_URL}

CMD ["yarn", "start:dev"]
