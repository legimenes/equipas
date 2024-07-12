import express from "express";
import PgPromiseAdapter from "@infra/data/connection/PgPromiseAdapter";

import PlayerRepository from "@infra/data/repositories/PlayerRepository";
import CreatePlayerUseCase from "@application/features/players/createPlayer/CreatePlayerUseCase";
import CreatePlayerEndpoint from "@application/features/players/createPlayer/CreatePlayerEndpoint";
import PlayerRouter from "@application/features/players/PlayerRouter";

const databaseConnection = new PgPromiseAdapter();
const playerRepository = new PlayerRepository(databaseConnection);

const createPlayerUseCase = new CreatePlayerUseCase(playerRepository);
const createPlayerEndpoint = new CreatePlayerEndpoint(createPlayerUseCase);

const router = express.Router();
PlayerRouter.register(router, createPlayerEndpoint);

export { router };
