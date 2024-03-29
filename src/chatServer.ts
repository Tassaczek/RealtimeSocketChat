import net from 'net';

interface Client {
  id: number;
  socket: net.Socket;
  name: string;
}

let idCounter = 0;
const clients: Client[] = [];

const broadcast = (message: string, sender: Client) => {
  clients.forEach((client) => {
    if (client.id === sender.id) return;
    client.socket.write(message);
  });
};

const createServer = () => {
  const server = net.createServer((socket) => {
    console.log('New client connected');

    // Setting the encoding to 'utf-8' ensures that received data is treated as strings, not as Buffer objects.
    socket.setEncoding('utf-8');

    const client: Client = {
      id: idCounter++,
      socket: socket,
      name: '',
    };

    socket.write('Please enter your name: ');

    socket.on('data', (data) => {
      // The first message from a new client is their name.
      // Set it and add the client to the list.
      if (clients.indexOf(client) === -1) {
        client.name = data.toString().trim();
        clients.push(client);
        // Greet the new client and notify others about the new chat participant.
        socket.write(`${client.name}, Welcome to the chat!\n`);
        broadcast(`${client.name} has joined the chat.\n`, client);
        return;
      }
      // Prefix each message with the sender's name for clarity.
      const message = `${client.name}: ${data}`;
      broadcast(message, client);
    });

    socket.on('end', () => {
      console.log('Client disconnected');
      clients.splice(clients.indexOf(client), 1);
      broadcast(`${client.name} has left the chat.\n`, client);
    });

    socket.on('error', (err) => {
      console.error(`Client error: ${err.message}`);
    });
  });
  return server;
};

export default createServer;
