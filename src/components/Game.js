import classes from "./Game.module.css";
import edit from "../media/edit_button.png";

function Game(props) {
  return (
    <div className={classes.game}>
      <button className={classes.rsvp}>RSVP</button>
      <h2 className={classes.date}>{props.date}</h2>
      <button className={classes.edit}>
        <img src={edit} alt={edit} className={classes.edit_image} />
      </button>

      <div style={{ display: "flex" }}>
        <div className={classes.players}>
          <div>
            <h3 style={{ margin: 0 }}>In</h3>
            <button className={classes.in_button}>{props.numIn}</button>
          </div>
          <div>
            <h3 style={{ margin: 0 }}>Out</h3>
            <button className={classes.out_button}>{props.numOut}</button>
          </div>
        </div>
        <div>
          <h2 style={{ margin: 0 }}>
            Time: {props.start_time} - {props.end_time}
          </h2>
          <h3>Location: {props.location}</h3>
        </div>
      </div>
    </div>
  );
}

export default Game;
