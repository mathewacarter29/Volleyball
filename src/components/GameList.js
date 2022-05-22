import Game from "./Game";
import classes from "./GameList.module.css";

function GameList(props) {
  const games = props.games.map((game) => (
    <Game
      date={game.date}
      start_time={game.start_time}
      end_time={game.end_time}
      location={game.location}
      numIn={game.numIn}
      numOut={game.numOut}
    ></Game>
  ));

  return (
    <div className={classes.gamelist}>
      <h1>Upcoming Games</h1>
      {games}
    </div>
  );
}

export default GameList;
