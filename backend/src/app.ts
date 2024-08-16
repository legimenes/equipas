import express from "express";
import { container } from "@infra/di/container";
import PositionRouter from "@application/modules/positions/PositionRouter";
import CreatePositionEndpoint from "@application/modules/positions/createPosition/CreatePositionEndpoint";
import UpdatePositionEndpoint from "@application/modules/positions/updatePosition/UpdatePositionEndpoint";
import DeletePositionEndpoint from "@application/modules/positions/deletePosition/DeletePositionEndpoint";
import GetPositionByIdEndpoint from "@application/modules/positions/getPositionById/GetPositionByIdEndpoint";

const createPositionEndpoint = container.get(CreatePositionEndpoint);
const updatePositionEndpoint = container.get(UpdatePositionEndpoint);
const deletePositionEndpoint = container.get(DeletePositionEndpoint);
const getPositionByIdEndpoint = container.get(GetPositionByIdEndpoint);

const router = express.Router();
//PlayerRouter.register(router, createPlayerEndpoint);
PositionRouter.register(router, createPositionEndpoint, updatePositionEndpoint, deletePositionEndpoint, getPositionByIdEndpoint);

export { router };
