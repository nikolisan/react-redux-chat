FROM node:8
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY .babelrc ./
COPY webpack* ./
COPY ./client/ ./client/
RUN mkdir server
COPY ./server/index.html ./server/
RUN npm run build

RUN rm -rfd server
RUN rm -rfd client
RUN rm -rfd .babelrc webpack*

RUN mkdir config models routes validation 
COPY ./server/index.js .
COPY ./server/passport.js .
COPY ./server/config ./config
COPY ./server/models ./models
COPY ./server/validation ./validation
COPY ./server/routes ./routes

ENV MODE="production"
ENV PORT 80
EXPOSE 3000
CMD ["npm", "run", "docker"]