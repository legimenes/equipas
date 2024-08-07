import express, { Router } from "express";
import routerParametersValidation from "@infra/middlewares/routerParametersValidationMiddleware";
import GetPositionByIdSchema from "./getPositionById/GetPositionByIdSchema";
import GetPositionByIdEndpoint from "./getPositionById/GetPositionByIdEndpoint";
import CreatePositionSchema from "./createPosition/CreatePositionSchema";
import CreatePositionEndpoint from "./createPosition/CreatePositionEndpoint";
import UpdatePositionSchema from "./updatePosition/UpdatePositionSchema";
import UpdatePositionIdSchema from "./updatePosition/UpdatePositionIdSchema";
import UpdatePositionEndpoint from "./updatePosition/UpdatePositionEndpoint";

export default class PositionRouter {
  static register(router: Router,
    getByIdEndpoint: GetPositionByIdEndpoint,
    createPostionEndpoint: CreatePositionEndpoint,
    updatePostionEndpoint: UpdatePositionEndpoint): void {
    const positionRouter = express.Router();

    positionRouter.get(
      '/:id',
      routerParametersValidation( { parametersSchema: GetPositionByIdSchema }),
      (request, response) => getByIdEndpoint.execute(request, response));
    
    positionRouter.post(
      '/',
      routerParametersValidation( { bodySchema: CreatePositionSchema } ),
      (request, response) => createPostionEndpoint.execute(request, response));

    positionRouter.put(
      '/:id',
      routerParametersValidation( { parametersSchema: UpdatePositionIdSchema, bodySchema: UpdatePositionSchema } ),
      (request, response) => updatePostionEndpoint.execute(request, response));
    
    router.use('/positions', positionRouter);
  }
}
