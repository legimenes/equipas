import express from "express";
import { container } from "@infra/di/container";
import PositionRouter from "@application/modules/positions/PositionRouter";
import CreatePositionEndpoint from "@application/modules/positions/createPosition/CreatePositionEndpoint";
import UpdatePositionEndpoint from "@application/modules/positions/updatePosition/UpdatePositionEndpoint";
import DeletePositionEndpoint from "@application/modules/positions/deletePosition/DeletePositionEndpoint";
import GetPositionEndpoint from "@application/modules/positions/getPosition/GetPositionEndpoint";
import SearchPositionsEndpoint from "@application/modules/positions/searchPositions/SearchPositionsEndpoint";

const createPositionEndpoint = container.get(CreatePositionEndpoint);
const updatePositionEndpoint = container.get(UpdatePositionEndpoint);
const deletePositionEndpoint = container.get(DeletePositionEndpoint);
const getPositionEndpoint = container.get(GetPositionEndpoint);
const searchPositionsEndpoint = container.get(SearchPositionsEndpoint);

const router = express.Router();
//PlayerRouter.register(router, createPlayerEndpoint);
PositionRouter.register(router, createPositionEndpoint, updatePositionEndpoint, deletePositionEndpoint, getPositionEndpoint, searchPositionsEndpoint);

export { router };
