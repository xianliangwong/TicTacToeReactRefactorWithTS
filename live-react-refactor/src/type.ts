export type GameState = {
  moves: Move[];
  history: {
    currentRoundGames: Game[];
    allGames: Game[];
  };
};

export type Move = {
  squareId: number;
  player: Player;
};

export type GameStatus = {
  isComplete: boolean;
  winner: Player | null;
};

export type Game = {
  moves: Move[];
  status: GameStatus;
};

export type Player = {
  id: number;
  colorClass: string;
  iconClass: string;
  playerText: string;
  name: string;
};

export type GameWithPlayer = {
  moves: Move[];
  currentPlayer: Player;
  status: GameStatus;
};
