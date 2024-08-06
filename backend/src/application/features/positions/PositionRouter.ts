import express, { Router } from "express";
import routerParametersValidation from "@infra/middlewares/routerParametersValidationMiddleware";
import GetPositionByIdSchema from "./getPositionById/GetPositionByIdSchema";
import CreatePositionSchema from "./createPosition/CreatePositionSchema";
import CreatePositionEndpoint from "./createPosition/CreatePositionEndpoint";
import GetPositionByIdEndpoint from "./getPositionById/GetPositionByIdEndpoint";

export default class PositionRouter {
  static register(router: Router,
    getByIdEndpoint: GetPositionByIdEndpoint,
    createPostionEndpoint: CreatePositionEndpoint): void {
    const positionRouter = express.Router();

    positionRouter.get(
      '/:id',
      routerParametersValidation( { parametersSchema: GetPositionByIdSchema }),
      (request, response) => getByIdEndpoint.execute(request, response));
    
    positionRouter.post(
      '/',
      routerParametersValidation( { bodySchema: CreatePositionSchema } ),
      (request, response) => createPostionEndpoint.execute(request, response));
    
    router.use('/positions', positionRouter);
  }
}
