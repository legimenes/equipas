import CreatePlayer from "@application/usecase/CreatePlayer";
import ICreatePlayer from "@application/usecase/ICreatePlayer";
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
  let player: Player = Player.create('Neymar', 5, 'A');
  await createPlayer.execute(player);

  player = Player.create('Neuer', 5, 'G');
  await createPlayer.execute(player);
  //console.log(data);
})
