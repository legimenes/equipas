import Player from "./Player";
import Position from "./Position";

export default class Team {
  players: Player[] = [];

  private constructor(
    readonly name: string
  ) {
  }

  static create(name: string): Team {
    return new Team(name);
  }

  addPlayer(player: Player): void {
    this.players.push(player);
  }

  checkPlayersPositionAvailability(position: Position): boolean {
    if (position.maximumPositionPlayers === undefined) {
      return true;
    }
  
    const maximumPositionPlayers = position.maximumPositionPlayers;
    const playersNumberInPosition = this.getPlayersNumberInPosition(position.name);
    
    return maximumPositionPlayers > playersNumberInPosition;
  }

  getLevel(): number {
    if (this.players.length === 0) {
      return 0;
    }

    const totalLevel = this.players.reduce((sum, player) => sum + player.level, 0);
    return totalLevel;
  }

  getPlayersNumberInPosition(position: string): number {
    const playersNumber = this.players.filter(player => player.position === position).length;
    return playersNumber;
  }
}
