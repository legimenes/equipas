import express, { Router } from "express";
import routerParametersValidation from "@infra/middlewares/routerParametersValidationMiddleware";
import CreatePositionRequestSchema from "./createPosition/CreatePositionRequestSchema";
import CreatePositionEndpoint from "./createPosition/CreatePositionEndpoint";
import UpdatePositionRequestSchema from "./updatePosition/UpdatePositionRequestSchema";
import UpdatePositionRequestIdSchema from "./updatePosition/UpdatePositionRequestIdSchema";
import UpdatePositionEndpoint from "./updatePosition/UpdatePositionEndpoint";
import DeletePositionRequestSchema from "./deletePosition/DeletePositionRequestSchema";
import DeletePositionEndpoint from "./deletePosition/DeletePositionEndpoint";
import GetPositionRequestSchema from "./getPosition/GetPositionRequestSchema";
import GetPositionEndpoint from "./getPosition/GetPositionEndpoint";
import SearchPositionsEndpoint from "./searchPositions/SearchPositionsEndpoint";

export default class PositionRouter {
  static register(router: Router,
    createPositionEndpoint: CreatePositionEndpoint,
    updatePostionEndpoint: UpdatePositionEndpoint,
    deletePostionEndpoint: DeletePositionEndpoint,
    getPositionEndpoint: GetPositionEndpoint,
    searchPositionsEndpoint: SearchPositionsEndpoint
  ): void {
    const positionRouter = express.Router();

    positionRouter.post(
      '/',
      routerParametersValidation( { bodySchema: CreatePositionRequestSchema } ),
      (request, response) => createPositionEndpoint.execute(request, response));

    positionRouter.put(
      '/:id(\\d+)',
      routerParametersValidation( { parametersSchema: UpdatePositionRequestIdSchema, bodySchema: UpdatePositionRequestSchema } ),
      (request, response) => updatePostionEndpoint.execute(request, response));

    positionRouter.delete(
      '/:id(\\d+)',
      routerParametersValidation( { parametersSchema: DeletePositionRequestSchema } ),
      (request, response) => deletePostionEndpoint.execute(request, response));

    positionRouter.get(
      '/:id(\\d+)',
      routerParametersValidation( { parametersSchema: GetPositionRequestSchema }),
      (request, response) => getPositionEndpoint.execute(request, response));

    positionRouter.get(
      '/search',
      //routerParametersValidation( { parametersSchema: GetPositionRequestSchema }),
      (request, response) => searchPositionsEndpoint.execute(request, response));

    router.use('/positions', positionRouter);
  }
}
