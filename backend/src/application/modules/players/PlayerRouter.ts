import express, { Router } from "express";
import routerParametersValidation from "@infra/middlewares/routerParametersValidationMiddleware";
import CreatePlayerSchema from "./createPlayer/CreatePlayerSchema";
import CreatePlayerEndpoint from "./createPlayer/CreatePlayerEndpoint";

export default class PlayerRouter {
  static register(router: Router,
    createPlayerEndpoint: CreatePlayerEndpoint): void {
    const playerRouter = express.Router();

    playerRouter.post(
      '/',
      //routerParametersValidation(CreatePlayerSchema),
      (request, response) => createPlayerEndpoint.create(request, response));
    
    router.use('/players', playerRouter);
  }
}
