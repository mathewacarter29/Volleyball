import classes from "./RsvpScreen.module.css";

function RsvpScreen() {
  return (
    <div className={classes.rsvp}>
      <div className={classes.buttons}>
        <button className={classes.yes}>Yes</button>
        <button className={classes.no}>No</button>
      </div>
    </div>
  );
}

export default RsvpScreen;
