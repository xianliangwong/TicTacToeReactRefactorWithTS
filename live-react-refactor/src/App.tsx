import { useState } from "react";
import "./AppCss.css";
import Menu from "./components/Menu";
import Modal from "./components/Modal";
import { GameState, Player } from "./type";
import classNames from "classnames";

const players: Player[] = [
  {
    id: 1,
    colorClass: "yellow",
    iconClass: "material-symbols-outlined",
    playerText: "close",
    name: "Player 1",
  },
  {
    id: 2,
    colorClass: "turquoise",
    iconClass: "material-symbols-outlined",
    playerText: "circle",
    name: "Player 2",
  },
];

function deriveGame(state: GameState) {
  // currentPlayer can only either be 0 or 1 , 8
  const currentPlayer = players[state.moves.length % 2];

  //check if winning condition is meet or it's a tie
  const winningPatterns = [
    [1, 2, 3],
    [1, 5, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 5, 7],
    [3, 6, 9],
    [4, 5, 6],
    [7, 8, 9],
  ];

  let winner = null;

  for (const player of players) {
    const selectedSquareId = state.moves
      .filter((move) => move.player.id === player.id)
      .map((move) => move.squareId);

    for (const patterns of winningPatterns) {
      if (patterns.every((v) => selectedSquareId.includes(v))) {
        winner = player;
      }
    }
  }

  return {
    moves: state.moves,
    currentPlayer,
    status: {
      isComplete: winner != null || state.moves.length === 9,
      winner,
    },
  };
}

//player stats
function deriveStats(state: GameState) {
  return {
    playerWithStats: players.map((player) => {
      const wins = state.history.currentRoundGames.filter(
        (game) => game.status.winner?.id === player.id
      ).length;

      return {
        ...player,
        wins,
      };
    }),
    ties: state.history.currentRoundGames.filter(
      (game) => game.status.winner === null
    ).length,
  };
}

export default function App() {
  const [state, setState] = useState({
    moves: [],
    history: {
      currentRoundGames: [],
      allGames: [],
    },
  } as GameState);

  function handlePlayerMove(squareId: number, player: Player) {
    //This implementation returns number
    // setState(state.moves.push({squareId,player});

    //hence need to get the snapshot of previous state then return stateClone
    //as stateClone is GameState type

    setState((prev) => {
      const stateClone = structuredClone(prev);

      stateClone.moves.push({ squareId, player });

      return stateClone;
    });
  }

  function resetGame(isNewRound: boolean) {
    setState((prev) => {
      const stateClone = structuredClone(prev);

      const { moves, status } = deriveGame(stateClone);

      if (status.isComplete) {
        stateClone.history.currentRoundGames.push({
          moves,
          status,
        });
      }

      stateClone.moves = [];

      if (isNewRound) {
        stateClone.history.allGames.push(
          ...stateClone.history.currentRoundGames
        );
        stateClone.history.currentRoundGames = [];
      }

      return stateClone;
    });
  }

  //getting derived state
  const game = deriveGame(state);
  const stats = deriveStats(state);

  return (
    <>
      <main>
        <div className="grid-container">
          <div
            key={game.currentPlayer.id}
            className={classNames("turn", game.currentPlayer.colorClass)}
            // {classNames("turn", game.currentPlayer.colorClass
            id="turn1"
          >
            <span className="material-symbols-outlined">
              {game.currentPlayer.playerText}
            </span>
            <p>{game.currentPlayer.name}, you're up!</p>
          </div>

          <Menu onAction={(action) => resetGame(action === "new-round")} />

          {/* can create a list of dynamic array to push in data */}

          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((squareId) => {
            const existingMove = game.moves.find(
              (move) => move.squareId === squareId
            );

            return (
              <>
                <div
                  key={squareId}
                  className="box-play-field shadow"
                  onClick={() => {
                    if (existingMove) return;

                    handlePlayerMove(squareId, game.currentPlayer);
                  }}
                >
                  {existingMove && (
                    <span
                      className={classNames(
                        "material-symbols-outlined",
                        existingMove.player.colorClass
                      )}
                    >
                      {existingMove.player.playerText}
                    </span>
                  )}
                </div>
              </>
            );
          })}

          {/* <div className="box-play-field shadow" id="1" data-id="square"></div>
          <div className="box-play-field shadow" id="2" data-id="square"></div>
          <div className="box-play-field shadow" id="3" data-id="square"></div>
          <div className="box-play-field shadow" id="4" data-id="square"></div>
          <div className="box-play-field shadow" id="5" data-id="square"></div>
          <div className="box-play-field shadow" id="6" data-id="square"></div>
          <div className="box-play-field shadow" id="7" data-id="square"></div>
          <div className="box-play-field shadow" id="8" data-id="square"></div>
          <div className="box-play-field shadow" id="9" data-id="square"></div> */}

          <div
            className="score shadaow"
            style={{ backgroundColor: "var(--turquiose)" }}
          >
            <p>Player 1</p>
            <span data-id="p1-wins">{stats.playerWithStats[0].wins} Wins</span>
          </div>
          <div
            className="score"
            style={{ backgroundColor: "var(--light-gray)" }}
          >
            <p>Ties</p>
            <span data-id="total-ties">{stats.ties}</span>
          </div>
          <div className="score" style={{ backgroundColor: "var(--yellow)" }}>
            <p>Player 2</p>
            <span data-id="p2-wins">{stats.playerWithStats[1].wins} Wins</span>
          </div>
        </div>
      </main>

      {game.status.isComplete && (
        <Modal
          message={
            game.status.winner
              ? `Player ${game.status.winner.id} wins !`
              : "Tied"
          }
          onClick={() => resetGame(false)}
        />
      )}
    </>
  );
}
