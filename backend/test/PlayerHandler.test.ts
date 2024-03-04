import CreatePlayer from "@application/usecase/CreatePlayer";
import ICreatePlayer from "@application/ports/driver/ICreatePlayer";
import { CreatePlayerInput } from "@application/ports/driver/CreatePlayerInput";
import Player from "@domain/Player"
import PlayerDAO from "@infra/data/PlayerDAO";
import Sqlite3Adapter from "@infra/data/Sqlite3Adapter";

let createPlayer: ICreatePlayer;

beforeEach(async () => {
  const connection = new Sqlite3Adapter();
  const playerDAO = new PlayerDAO(connection);
  createPlayer = new CreatePlayer(playerDAO);

  const players: Player[] = await playerDAO.get();
  players.forEach((p) => playerDAO.delete(p.id));
})

test('Should create a player', async () => {
  let input: CreatePlayerInput = { name: "Neymar", level: 5, position: "A" }

  await createPlayer.execute(input);

  input = { name: "Neuer", level: 5, position: "G" }
  await createPlayer.execute(input);
  //console.log(data);
})
