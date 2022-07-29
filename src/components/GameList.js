import Game from "./Game";
import classes from "./GameList.module.css";
import Modal from "../ui/Modal";
import { useState } from "react";
import RsvpScreen from "./RsvpScreen";

function GameList(props) {
  const [showModal, setShowModal] = useState(false);
  const [rsvpTitle, setRsvpTitle] = useState("");

  function rsvp(game) {
    const title = game.date + " - " + game.start_time;
    setRsvpTitle(title);
    setShowModal(true);
  }

  const games = props.games.map((game) => (
    <Game
      key={game.id}
      date={game.date}
      start_time={game.start_time}
      end_time={game.end_time}
      location={game.location}
      numIn={game.numIn}
      numOut={game.numOut}
      team={game.team}
      description={game.description}
      pressedRsvp={rsvp}
    ></Game>
  ));

  return showModal ? (
    <Modal onClose={() => setShowModal(false)} title={rsvpTitle}>
      <RsvpScreen></RsvpScreen>
    </Modal>
  ) : (
    <div className={classes.gamelist}>
      <h1>Upcoming Games</h1>
      {games}
    </div>
  );
}

export default GameList;
