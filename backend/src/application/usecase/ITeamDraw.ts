import Player from "@domain/Player";
import Team from "@domain/Team";

export default interface ITeamDraw {
  execute(players: Player[], maximumTeamPlayers: number): Promise<Team[]>
}
