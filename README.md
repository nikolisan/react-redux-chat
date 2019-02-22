# Node RT-Chat App

A chat application created in a MERN stack.

![](https://img.shields.io/github/issues/nikolisan/chat-server.svg)

## Instructions

### Local - Development use
To run the application for development use
```bash
npm install
npm run dev
```
The backend server uses nodemon and the frontend uses webpack with HMR and proxy.
The app is served @ localhost:5000

### Local - Production use
To build the application for production use
```bash
npm install
npm run build
npm start
```
The app is served @ localhost:3000


### Docker container
To run in a docker container use
```
docker build -t chat-app .
docker run -p 3000:3000 chat-app
```
The app is served @ localhost:3000. Change the port according to your needs.

