import express from "express";
import { router } from './app';

const server = express();
const port = 3000;

server.use(express.json());
server.use(router);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const shutdown = () => {
  console.log('Shutting down gracefully...');
  // Perform necessary cleanup
  process.exit(1);
};

process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error', err);
  shutdown();
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  shutdown();
});