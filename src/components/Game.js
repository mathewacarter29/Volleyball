import classes from "./Game.module.css";
import edit from "../media/edit_button.png";
import { useState, useEffect } from "react";
import firebase from "../util/firebase";
import { getDatabase, ref, get } from "firebase/database";
import PlayerStatusMenu from "../ui/PlayerStatusMenu";
import Modal from "../ui/Modal";
import RsvpScreen from "./RsvpScreen";

function Game(props) {
  const game = {
    date: props.date,
    start_time: props.start_time,
    end_time: props.end_time,
    location: props.location,
    numIn: props.numIn,
    numOut: props.numOut,
    team: props.team,
    description: props.description,
    id: props.id,
  };

  // const DUMMY_IN = [
  //   "David Benko",
  //   "George Benko",
  //   "Amy Carter",
  //   "Carver Vergara",
  // ];

  // const DUMMY_OUT = ["Geno", "Johnnyyyy"];
  const [isStatusClicked, setIsStatusClicked] = useState(false);
  const [inPlayers, setInPlayers] = useState([]);
  const [outPlayers, setOutPlayers] = useState([]);
  const [isRsvpClicked, setIsRsvpClicked] = useState(false);

  useEffect(() => {
    const db = getDatabase(firebase);
    get(ref(db, `games/${game.id}/players`)).then((snapshot) => {
      const data = snapshot.val();
      let inPlayerList = [];
      let outPlayerList = [];
      for (const key in data) {
        let [status, ...note] = data[key].split(" ");
        note = note.join(" ");
        const player = {
          name: key,
          note: note,
        };
        // if you split data, split[0] is the stat
        if (status === "in") {
          inPlayerList.push(player);
        } else {
          outPlayerList.push(player);
        }
      }
      setInPlayers(inPlayerList);
      setOutPlayers(outPlayerList);
    });
  }, [game.id, isRsvpClicked]);

  return (
    <div className={classes.game_wrapper}>
      {isStatusClicked && (
        <Modal
          title={`Game on ${game.date} at ${game.start_time}`}
          onClose={() => setIsStatusClicked(false)}
        >
          <PlayerStatusMenu
            inPlayers={inPlayers}
            outPlayers={outPlayers}
          ></PlayerStatusMenu>
        </Modal>
      )}
      {isRsvpClicked && (
        <Modal
          onClose={() => setIsRsvpClicked(false)}
          title={`Game on ${game.date} at ${game.start_time}`}
        >
          <RsvpScreen
            gameId={game.id}
            onClose={() => setIsRsvpClicked(false)}
          ></RsvpScreen>
        </Modal>
      )}
      <div className={classes.game}>
        <button className={classes.rsvp} onClick={() => setIsRsvpClicked(true)}>
          RSVP
        </button>

        <h2 className={classes.date}>{game.date}</h2>
        <button className={classes.edit}>
          <img src={edit} alt={edit} />
        </button>

        <div style={{ display: "flex" }}>
          <div className={classes.players}>
            <div>
              <h3 style={{ margin: 0 }}>In</h3>
              <button
                onClick={() => {
                  setIsStatusClicked(true);
                }}
                className={classes.in_button}
              >
                {inPlayers.length}
              </button>
            </div>
            <div>
              <h3 style={{ margin: 0 }}>Out</h3>
              <button
                className={classes.out_button}
                onClick={() => {
                  setIsStatusClicked(true);
                }}
              >
                {outPlayers.length}
              </button>
            </div>
          </div>
          <div>
            <h2 style={{ margin: 0 }}>
              {game.start_time} - {game.end_time}
            </h2>
            <h3>Location: {game.location}</h3>
            <h3>Team: {game.team}</h3>
          </div>
        </div>
        {game.description !== "" && (
          <div>
            <hr
              style={{
                color: "black",
                height: "2px",
                backgroundColor: "black",
                marginBottom: 0,
              }}
            />
            <div className={classes.description}>
              <h4>Description: </h4>
              {game.description}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Game;
