<img src="images/logo.webp" alt="Logo" width="100"/>

# Simple TCP/IP Socket Chat

This project was created to explore TCP/IP Sockets. It allows users to communicate through the terminal with others on the same local network.

### Installation

**Prerequisite:** Node.js version 18 or higher is required.

- Clone the project and navigate into its directory.
- Execute `npm install` to install dependencies.

### Usage

**Important Notes:** 
- Multiple terminal windows are required: one for the server and additional ones for each chat participant.
- Ensure your system has `netcat` installed by running the `nc` command in the terminal. Alternatively, `telnet` can be used if `netcat` is not available.

1. Open a new terminal window, navigate to the project directory, and execute `npm run dev` to start the local server on port 3000.
2. In another terminal window, execute `nc localhost 3000` to join the chat. Repeat this step for each participant.
3. You are now ready to chat!

### TODO

- [ ] Implement tests
- [ ] In the future, consider adding a database to store chat history

### License

This project is licensed under the MIT License.
