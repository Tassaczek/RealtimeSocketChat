const net = require('net');

const client = new net.Socket();
client.connect(3000, '127.0.0.1', () => {
  console.log('Connected to server');
  client.write('Hello, server! Love, Client.');
});

client.on('data', (data) => {
  console.log(`Received: ${data}`);
  client.end();
});

client.on('close', () => {
  console.log('Connection closed');
});
