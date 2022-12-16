import classes from "./RsvpScreen.module.css";
import thumbsUp from "../media/thumbs_up.png";
import thumbsDown from "../media/thumbs_down.png";
import firebase from "../util/firebase";
import { getDatabase, ref, set } from "firebase/database";

function RsvpScreen(props) {
  async function rsvp(res) {
    const db = getDatabase(firebase);
    const dbRef = ref(db, `games/${props.gameId}/players`);
    if (res === "in") {
      await set(dbRef, { dummyName: "in" });
    } else {
      await set(dbRef, { dummyName: "out" });
    }
  }

  return (
    <div className={classes.rsvp}>
      <h1>Will you come to this game?</h1>
      <div className={classes.buttons}>
        <button className={classes.yes} onClick={() => rsvp("in")}>
          <img src={thumbsUp} alt={thumbsUp}></img>
        </button>
        <button className={classes.no} onClick={() => rsvp("out")}>
          <img src={thumbsDown} alt={thumbsDown}></img>
        </button>
      </div>
    </div>
  );
}

export default RsvpScreen;
