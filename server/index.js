// server/index.js
'use strict';

const http = require('http');
const app = require('./app');

const PORT = process.env.PORT || 3000;
const server = http.createServer(
  {
    maxHeaderSize: 65536,
  },
  app
);

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
