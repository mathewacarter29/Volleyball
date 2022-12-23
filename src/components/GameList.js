import Game from "./Game";
import classes from "./GameList.module.css";

function GameList(props) {
  const games = props.games.map((game) => (
    <Game
      key={game.id}
      day={game.day}
      date={game.date}
      start_time={game.start_time}
      end_time={game.end_time}
      location={game.location}
      team={game.team}
      description={game.description}
      id={game.id}
    ></Game>
  ));

  return (
    <div className={classes.gamelist}>
      <h1 style={{ marginTop: "90px" }}>Upcoming Games</h1>
      {games.length !== 0 ? (
        games
      ) : (
        <h1 style={{ marginTop: "15%", fontSize: "5vw" }}>
          No currently scheduled games
        </h1>
      )}
      {/*Below div is for spacing at the bottom of the page */}
      <div style={{ height: "50px" }}></div>
    </div>
  );
}

export default GameList;
