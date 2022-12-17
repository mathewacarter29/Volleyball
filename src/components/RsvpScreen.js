import classes from "./RsvpScreen.module.css";
import thumbsUp from "../media/thumbs_up.png";
import thumbsDown from "../media/thumbs_down.png";
import firebase from "../util/firebase";
import { getDatabase, ref, set } from "firebase/database";
import { useRef } from "react";

function RsvpScreen(props) {
  const dummyName = "no note";
  const descriptionInputRef = useRef();

  async function rsvp(res) {
    const db = getDatabase(firebase);
    const dbRef = ref(db, `games/${props.gameId}/players/${dummyName}`);

    let value = res;
    if (descriptionInputRef.current.value !== "") {
      console.log("description was not empty");
      value += ` ${descriptionInputRef.current.value}`;
    }
    let obj = {};
    obj[dummyName] = value;
    await set(dbRef, value);
    props.onClose();
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
      <div className={classes.description}>
        <label htmlFor="description">Note</label>
        <textarea id="description" rows="5" ref={descriptionInputRef} />
      </div>
    </div>
  );
}

export default RsvpScreen;
