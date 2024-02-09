import Player from "@domain/Player";
import Team from "@domain/Team";
import ITeamDraw from "./ITeamDraw";
import IPositionDAO from "@application/data/IPositionDAO";
import Position from "@domain/Position";
import '@domain/core/arrayExtensions';

export default class TeamDraw implements ITeamDraw {
  constructor(readonly positionDAO: IPositionDAO) {
  }

  async execute(players: Player[], maximumTeamPlayers: number): Promise<Team[]> {
    const positions = await this.positionDAO.get();

    this.shuffleAndSortPlayersByMaximumLevel(players);
    this.groupPlayersByPositionZone(players, positions);

		const teams: Team[] = this.createTeams(players, maximumTeamPlayers);

    const remainingPlayers: Player[] = [];
		let currentTeamIndex = 0;
		let position: Position = positions.find(position => position.name === players[0].position)!;

		players.forEach(player => {
			if (player.position !== position.name) {
				position = positions.find(position => position.name === player.position)!;
			}
	
			currentTeamIndex = currentTeamIndex == teams.length ? 0 : currentTeamIndex;
			if (!teams[currentTeamIndex].checkPlayersPositionAvailability(position)) {
				remainingPlayers.push(player);
				return;
			}
	
			teams[currentTeamIndex].addPlayer(player);
			currentTeamIndex++;
		});
	
		remainingPlayers.forEach(player => {
			currentTeamIndex = currentTeamIndex == teams.length ? 0 : currentTeamIndex;
			teams[currentTeamIndex].addPlayer(player);
			currentTeamIndex++;
		});
	
		teams.forEach(team => {
			team.players.sort((a, b) => a.name.localeCompare(b.name))
		});

		return teams;
  }

	private createTeams(players: Player[], maximumTeamPlayers: number): Team[] {
		const totalTeams = this.divideAndAddOne(players.length, maximumTeamPlayers);
		const teams: Team[] = [];
		for (let i = 0; i < totalTeams; i++) {
			teams[i] = Team.create(`Team ${i + 1}`);
		}

		return teams;
	}

	private divideAndAddOne(a: number, b: number): number {
		const result = a / b;
		const decimalPart = result % 1;
		
		if (decimalPart !== 0) {
			return Math.floor(result) + 1;
		} else {
			return result;
		}
	}

	private groupPlayersByPositionZone(players: Player[], positions: Position[]) :void {
		const playersByPosition: Player[] = [];
		for (let index = 0; index < positions.length; index++) {
		  const position = positions[index];
		  
		  const foundElement = players.filter(item => item.position === position.name);
		  foundElement.forEach(element => {
			  playersByPosition[playersByPosition.length] = element;
		  });
		}

		players.splice(0, players.length);
		playersByPosition.forEach(player => players.push(player));
	}

  private shuffleAndSortPlayersByMaximumLevel(players: Player[]): void {
		players.shuffle();
		players.sort((a, b) => b.level - a.level);
	}
}
