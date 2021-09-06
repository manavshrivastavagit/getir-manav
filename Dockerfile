FROM node:16.3.0 as base

RUN mkdir -p /usr/src/code

WORKDIR /usr/src/code

COPY . .

FROM base as prod

RUN npm ci
CMD ["npm", "run", "start:prod"]

FROM base as test

CMD ["npm", "test"]