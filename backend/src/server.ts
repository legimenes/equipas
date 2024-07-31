import express from "express";
import { router } from './app';
import errorHandling from "@infra/middlewares/errorHandlingMiddleware";

const server = express();
const port = 3000;

server.use(express.json());
server.use(router);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
