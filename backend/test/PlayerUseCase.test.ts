import { CreatePlayerRequest } from "@features/players/createPlayer/CreatePlayerRequest";
import ICreatePlayerUseCase from "@features/players/createPlayer/ICreatePlayerUseCase";
import CreatePlayerUseCase from "@features/players/createPlayer/CreatePlayerUseCase";
import PgPromiseAdapter from "@infra/data/connection/PgPromiseAdapter";
import PlayerRepository from "@infra/data/repositories/PlayerRepository";

let createPlayerUseCase : ICreatePlayerUseCase

beforeEach(async () => {
  const databaseConnection = new PgPromiseAdapter();
  const playerRepository = new PlayerRepository(databaseConnection);
  createPlayerUseCase = new CreatePlayerUseCase(playerRepository);

  //const players: Player[] = await playerDAO.get();
  //players.forEach((p) => playerDAO.delete(p.id));
})

test('Should create a player', async () => {
  let input: CreatePlayerRequest = { name: "Neymar", level: 5, position: "A" }

  await createPlayerUseCase.execute(input);

  input = { name: "Neuer", level: 5, position: "G" }
  await createPlayerUseCase.execute(input);
  //console.log(data);
})
