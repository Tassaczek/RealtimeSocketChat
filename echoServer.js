const net = require('net');

const server = net.createServer((socket) => {
  let i = 0;
  console.log('Client connected.');

  socket.write('Hello');

  socket.on('data', (data) => {
    console.log(`Data received from client: ${data}`);
    socket.write(`Echo: ${data}`);
    i++;
    console.log('i', i);
  });

  socket.on('end', () => console.log('Client disconnected.'));
});

server.on('error', (err) => {
  throw err;
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
