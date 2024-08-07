import IPositionDAO from "@application/ports/driven/IPositionDAO";
import ITeamDrawUseCase from "@application/features/teams/teamDraw/ITeamDrawUseCase";
import TeamDrawUseCase from "@application/features/teams/teamDraw/TeamDrawUseCase";
import Player from "@domain/Player";
import Team from "@domain/Team";
import PgPromiseAdapter from "@infra/data/connection/PgPromiseAdapter";
import PositionDAO from "@infra/data/PositionDAO";

let teamDraw: ITeamDrawUseCase;
let thePositionDAO: IPositionDAO;

beforeEach(() => {
	// databaseConnection = new PgPromiseAdapter();
	// const accountRepository = new AccountRepositoryDatabase(databaseConnection);
	// const logger = new LoggerConsole();
	// signup = new Signup(accountRepository);
  //const positionDAO = new PositionInMemoryDAO();
  //const connection = new Sqlite3Adapter();
  const connection = new PgPromiseAdapter();
  const positionDAO = new PositionDAO(connection);
  thePositionDAO = positionDAO
	teamDraw = new TeamDrawUseCase(positionDAO);
})

test.skip('Should draw three teams', async () => {
  
  //const positions = await thePositionDAO.get();
  //console.log(positions);

  //const connection2 = new Sqlite3Adapter();
  //const positionDAO2 = new PositionDAO2(connection2);
  //const data = await positionDAO2.get();
  //console.log(data);

  

  const maximumTeamPlayers = 4;

  const players: Player[] = [];
  players[0] = Player.create('Neymar', 5, 'A');
  players[1] = Player.create('Griezmann', 4, 'M');
  players[2] = Player.create('Messi', 5, 'A');
  players[3] = Player.create('Maguire', 2, 'D');
  players[4] = Player.create('Cristiano Ronaldo', 5, 'M');
  players[5] = Player.create('Hakimi', 3, 'D');
  players[6] = Player.create('Karius', 2, 'G');
  players[7] = Player.create('Joao Felix', 3, 'M');
  players[8] = Player.create('Lewandovski', 4, 'A');
  players[9] = Player.create('Neuer', 5, 'G');
  players[10] = Player.create('Havertz', 3, 'M');
  players[11] = Player.create('Gundogan', 4, 'M');
 
  const teams: Team[] = await teamDraw.execute(players, maximumTeamPlayers);

  console.log(JSON.stringify(teams));
  expect(teams.length).toBe(3);
});
