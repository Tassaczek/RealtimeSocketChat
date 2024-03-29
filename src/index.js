import createServer from './chatServer.js';

const server = createServer();

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
