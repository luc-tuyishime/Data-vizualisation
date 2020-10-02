# irembo_web_controlpanel  

This app is developed for the purpose of event monitoring. It record real-time metrics for different apps (USSD orAGENT). 


[Link to the APP](https://irembo-web-dev.oltranz.com/)

### Pre-requisites

```
- Node 12
- Git
```

### Installation

```
npm install
```

### Start Dev Server

```
npm start
```

### Build Prod Version

```
npm run build
```

### Libraries used

```
- React 
- Rechart
- Websocket (React-stomp)
```

### Docker file

```
FROM node:12

// Create app directory
WORKDIR /usr/src/app

// Install app dependencies
// A wildcard is used to ensure both package.json AND package-lock.json are copied
// where available (npm@5+)
COPY package*.json ./

RUN npm install
// If you are building your code for production
// RUN npm ci --only=production

// Bundle app source
COPY . .