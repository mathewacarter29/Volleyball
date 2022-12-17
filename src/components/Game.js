import classes from "./Game.module.css";
import edit from "../media/edit_button.png";
import { useState, useEffect } from "react";
import firebase from "../util/firebase";
import { getDatabase, ref, get } from "firebase/database";

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
  const [isInClicked, setIsInClicked] = useState(false);
  const [isOutClicked, setIsOutClicked] = useState(false);
  const [inPlayers, setInPlayers] = useState([]);
  const [outPlayers, setOutPlayers] = useState([]);

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
  }, [game.id]);

  function getPlayers(rsvpStatus) {
    const playerList = rsvpStatus === "in" ? inPlayers : outPlayers;
    return playerList.map((player, index) => {
      return (
        <div key={index}>
          <li>{player.name}</li>
          <p className={classes.note}>{player.note}</p>
        </div>
      );
    });
  }

  return (
    <div className={classes.game_wrapper}>
      {isInClicked && (
        <div className={classes.nooverflow}>
          <div className={classes.details}>
            <h3>In</h3>
            <ul>{getPlayers("in")}</ul>
          </div>
        </div>
      )}
      {isOutClicked && (
        <div className={classes.details}>
          <h3>Out</h3>
          <ul>{getPlayers("out")}</ul>
        </div>
      )}
      <div className={classes.game}>
        <button
          className={classes.rsvp}
          onClick={() => props.pressedRsvp(game)}
        >
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
                  setIsInClicked((prevState) => !prevState);
                  setIsOutClicked(false);
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
                  setIsOutClicked((prevState) => !prevState);
                  setIsInClicked(false);
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
