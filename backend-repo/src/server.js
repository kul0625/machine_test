require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const connectDb = require('./config/db');

const PORT = process.env.PORT || 4000;

(async () => {
  await connectDb();
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true
    }
  });

  app.set('io', io);
  io.on('connection', () => {
    console.log('Socket client connected');
  });

  server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
})();
