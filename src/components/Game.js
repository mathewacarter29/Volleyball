import classes from "./Game.module.css";
import edit from "../media/edit_button.png";
import { useState } from "react";

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
  };

  const DUMMY_IN = [
    "David Benko",
    "George Benko",
    "Amy Carter",
    "Carver Vergara",
  ];

  const DUMMY_OUT = ["Geno", "Johnnyyyy"];
  const [isInClicked, setIsInClicked] = useState(false);
  const [isOutClicked, setIsOutClicked] = useState(false);

  return (
    <div className={classes.game_wrapper}>
      {isInClicked && (
        <div className={classes.details}>
          <h3>In</h3>
          <ul>
            {DUMMY_IN.map((player) => (
              <li>{player}</li>
            ))}
          </ul>
        </div>
      )}
      {isOutClicked && (
        <div className={classes.details}>
          <h3>Out</h3>
          <ul>
            {DUMMY_OUT.map((player) => (
              <li>{player}</li>
            ))}
          </ul>
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
                {game.numIn}
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
                {game.numOut}
              </button>
            </div>
          </div>
          <div>
            <h2 style={{ margin: 0 }}>
              Time: {game.start_time} - {game.end_time}
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
