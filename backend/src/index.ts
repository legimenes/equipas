  /*
  class Player {
    constructor(public Name: string, public Level: number, public Position: string) {}
  }
  
  class Team {
    players: Player[] = [];
  
    addPlayer(player: Player) {
      this.players.push(player);
    }
  
    getLevelSum() {
      return this.players.reduce((sum, player) => sum + player.Level, 0);
    }
  
    getPositionsCount() {
      const positionCount: { [key: string]: number } = { D: 0, M: 0, A: 0 };
      for (const player of this.players) {
        positionCount[player.Position]++;
      }
      return positionCount;
    }
  }
  
  function generateRandomPlayer(): Player {
    const names = ["Player1", "Player2", "Player3", "Player4", "Player5"];
    const levels = [1, 2, 3, 4, 5];
    const positions = ["D", "M", "A"];
  
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomLevel = levels[Math.floor(Math.random() * levels.length)];
    const randomPosition = positions[Math.floor(Math.random() * positions.length)];
  
    return new Player(randomName, randomLevel, randomPosition);
  }
  
  function generateTeams(players: Player[]): Team[] {
    const teams: Team[] = [new Team(), new Team()]; // You can have more teams if needed
  
    players.sort((a, b) => b.Level - a.Level); // Sort players by level in descending order
  
    while (players.length > 0) {
      for (const team of teams) {
        if (players.length == 0)
        {
          break;
        }
        const randomIndex = Math.floor(Math.random() * players.length);
        const randomPlayer = players.splice(randomIndex, 1)[0];
        team.addPlayer(randomPlayer);
      }
    }
  
    return teams;
  }
  
  // Create a list of random players
  const players: Player[] = [];
  for (let i = 0; i < 15; i++) {
    players.push(generateRandomPlayer());
  }
  
  // Generate balanced teams
  const balancedTeams = generateTeams(players);

  // Output teams
  balancedTeams.forEach((team, index) => {

    console.log(`Team ${index + 1}:`);
    console.log(`Total Level: ${team.getLevelSum()}`);
    console.log("Position Count:", team.getPositionsCount());
    console.log("Players:");

    team.players.forEach((player, i) => {
      console.log(`  Player ${i + 1}: Name: ${player.Name}, Level: ${player.Level}, Position: ${player.Position}`);
    });
    console.log();
  });
  */