import express, { Router } from "express";
import validation from "@infra/middlewares/routerParameterValidationMiddleware";
import CreatePositionSchema from "./createPosition/CreatePositionSchema";
import CreatePositionEndpoint from "./createPosition/CreatePositionEndpoint";

export default class PositionRouter {
  static register(router: Router,
    createPostionEndpoint: CreatePositionEndpoint): void {
    const positionRouter = express.Router();
    positionRouter.post(
      '/',
      validation(CreatePositionSchema),
      (request, response) => createPostionEndpoint.create(request, response));
    
    router.use('/positions', positionRouter);
  }
}
