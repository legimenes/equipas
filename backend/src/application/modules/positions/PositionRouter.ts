import express, { Router } from "express";
import routerParametersValidation from "@infra/middlewares/routerParametersValidationMiddleware";
import CreatePositionRequestSchema from "./createPosition/CreatePositionRequestSchema";
import CreatePositionEndpoint from "./createPosition/CreatePositionEndpoint";
import UpdatePositionRequestSchema from "./updatePosition/UpdatePositionRequestSchema";
import UpdatePositionRequestIdSchema from "./updatePosition/UpdatePositionRequestIdSchema";
import UpdatePositionEndpoint from "./updatePosition/UpdatePositionEndpoint";
import DeletePositionRequestSchema from "./deletePosition/DeletePositionRequestSchema";
import DeletePositionEndpoint from "./deletePosition/DeletePositionEndpoint";
import GetPositionByIdRequestSchema from "./getPositionById/GetPositionByIdRequestSchema";
import GetPositionByIdEndpoint from "./getPositionById/GetPositionByIdEndpoint";

export default class PositionRouter {
  static register(router: Router,
    createPositionEndpoint: CreatePositionEndpoint,
    updatePostionEndpoint: UpdatePositionEndpoint,
    deletePostionEndpoint: DeletePositionEndpoint,
    getPositionByIdEndpoint: GetPositionByIdEndpoint
  ): void {
    const positionRouter = express.Router();

    positionRouter.post(
      '/',
      routerParametersValidation( { bodySchema: CreatePositionRequestSchema } ),
      (request, response) => createPositionEndpoint.execute(request, response));

    positionRouter.put(
      '/:id',
      routerParametersValidation( { parametersSchema: UpdatePositionRequestIdSchema, bodySchema: UpdatePositionRequestSchema } ),
      (request, response) => updatePostionEndpoint.execute(request, response));

    positionRouter.delete(
      '/:id',
      routerParametersValidation( { parametersSchema: DeletePositionRequestSchema } ),
      (request, response) => deletePostionEndpoint.execute(request, response));

    positionRouter.get(
      '/:id',
      routerParametersValidation( { parametersSchema: GetPositionByIdRequestSchema }),
      (request, response) => getPositionByIdEndpoint.execute(request, response));

    router.use('/positions', positionRouter);
  }
}
