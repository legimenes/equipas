import Player from "@domain/Player";
import Team from "@domain/Team";

export default interface ITeamDrawUseCase {
  execute(players: Player[], maximumTeamPlayers: number):  Promise<Team[]>;
}
