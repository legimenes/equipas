import express, { Router } from "express";
import CreatePlayerEndpoint from "./createPlayer/CreatePlayerEndpoint";

export default class PlayerRouter {
  static register(router: Router,
    createPlayerEndpoint: CreatePlayerEndpoint): void {
    const playerRouter = express.Router();
    playerRouter.post('/', (request, response) => createPlayerEndpoint.create(request, response));
    
    router.use('/players', playerRouter);
  }
}
