import express from 'express';
import PlayerController from '@infra/controller/PlayerController';
import ICreatePlayer from '@application/ports/driver/ICreatePlayer';
import CreatePlayer from '@application/usecase/CreatePlayer';
import IPlayerDAO from '@application/ports/driven/IPlayerDAO';
import PlayerDAO from '@infra/data/PlayerDAO';
import IDatabaseConnection from '@infra/data/IDatabaseConnection';
import Sqlite3Adapter from '@infra/data/Sqlite3Adapter';

const router = express.Router();

const databaseConnection: IDatabaseConnection = new Sqlite3Adapter();
const playerDAO: IPlayerDAO = new PlayerDAO(databaseConnection);
const createPlayer: ICreatePlayer = new CreatePlayer(playerDAO);

const playerController = new PlayerController(createPlayer);

router.post('/', (request, response) => playerController.create(request, response));

module.exports = router;
