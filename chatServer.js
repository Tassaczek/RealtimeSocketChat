const net = require('net');

let idCounter = 0;
const clients = [];

const broadcast = (message, sender) => {
  clients.forEach((client) => {
    if (client.id === sender.id) return;
    client.socket.write(message);
  });
};

const server = net.createServer((socket) => {
  console.log('New client connected');
  const client = {
    id: idCounter++,
    socket: socket,
  };
  clients.push(client);
  socket.write('Welcome to the chat!\n');

  socket.on('data', (data) => {
    broadcast(data, client);
  });

  socket.on('end', () => {
    console.log('Client disconnected');
    clients.splice(clients.indexOf(client), 1);
    broadcast('A client has left the chat.\n', socket);
  });

  socket.on('error', (err) => {
    console.error(`Client error: ${err.message}`);
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
