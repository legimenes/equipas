import express from "express";
import PgPromiseAdapter from "@infra/data/connection/PgPromiseAdapter";

import PlayerRepository from "@infra/data/repositories/PlayerRepository";
import CreatePlayerUseCase from "@application/features/players/createPlayer/CreatePlayerUseCase";
import CreatePlayerEndpoint from "@application/features/players/createPlayer/CreatePlayerEndpoint";
import PlayerRouter from "@application/features/players/PlayerRouter";

import PositionRepository from "@infra/data/repositories/PositionRepository";
import CreatePositionUseCase from "@application/features/positions/createPosition/CreatePositionUseCase";
import CreatePositionEndpoint from "@application/features/positions/createPosition/CreatePositionEndpoint";
import PositionRouter from "@application/features/positions/PositionRouter";

const databaseConnection = new PgPromiseAdapter();

const positionRepository = new PositionRepository(databaseConnection);
const createPositionUseCase = new CreatePositionUseCase(positionRepository);
const createPositionEndpoint = new CreatePositionEndpoint(createPositionUseCase);

const playerRepository = new PlayerRepository(databaseConnection);
const createPlayerUseCase = new CreatePlayerUseCase(playerRepository);
const createPlayerEndpoint = new CreatePlayerEndpoint(createPlayerUseCase);

const router = express.Router();
PositionRouter.register(router, createPositionEndpoint);
PlayerRouter.register(router, createPlayerEndpoint);

export { router };
