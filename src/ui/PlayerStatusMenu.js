import classes from "./PlayerStatusMenu.module.css";

function PlayerStatusMenu(props) {
  function getPlayers(rsvpStatus) {
    const playerList = rsvpStatus === "in" ? props.inPlayers : props.outPlayers;
    return playerList.map((player, index) => {
      let title = `${player.name}`;
      title += String(player.note).length === 0 ? "" : ` - ${player.note}`;
      return <li key={index}>{title}</li>;
    });
  }

  return (
    <div className={classes.wrapper}>
      <div>
        <h2 style={{ textDecoration: "underline" }}>In</h2>
        <ul>{getPlayers("in")}</ul>
      </div>
      <hr style={{ width: "1" }}></hr>
      <div>
        <h2 style={{ textDecoration: "underline" }}>Out</h2>
        <ul>{getPlayers("out")}</ul>
      </div>
    </div>
  );
}

export default PlayerStatusMenu;
