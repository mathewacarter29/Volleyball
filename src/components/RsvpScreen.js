import classes from "./RsvpScreen.module.css";
import thumbsUp from "../media/thumbs_up.png";
import thumbsDown from "../media/thumbs_down.png";

function RsvpScreen() {
  return (
    <div className={classes.rsvp}>
      <h1>Will you come to this game?</h1>
      <div className={classes.buttons}>
        <button className={classes.yes}>
          <img src={thumbsUp} alt={thumbsUp}></img>
        </button>
        <button className={classes.no}>
          <img src={thumbsDown} alt={thumbsDown}></img>
        </button>
      </div>
    </div>
  );
}

export default RsvpScreen;
