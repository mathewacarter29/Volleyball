import classes from "./RsvpScreen.module.css";
import thumbsUp from "../media/thumbs_up.png";
import thumbsDown from "../media/thumbs_down.png";
import firebase from "../util/firebase";
import { getDatabase, ref, set } from "firebase/database";
import { useRef, useState } from "react";

function RsvpScreen(props) {
  const ButtonStatus = {
    None: "none",
    ThumbsUp: "thumbsup",
    ThumpsDown: "thumbsdown",
  };

  const dummyName = "no note";
  const descriptionInputRef = useRef();
  const [buttonSelected, setButtonSelected] = useState(ButtonStatus.None);

  async function rsvp(res) {
    const db = getDatabase(firebase);
    const dbRef = ref(db, `games/${props.gameId}/players/${dummyName}`);

    let value = res;
    if (descriptionInputRef.current.value !== "") {
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
        <button
          className={
            buttonSelected === ButtonStatus.ThumbsUp
              ? classes.yes_selected
              : classes.yes
          }
          onClick={() => setButtonSelected(ButtonStatus.ThumbsUp)}
        >
          <img src={thumbsUp} alt={thumbsUp}></img>
        </button>
        <button
          className={
            buttonSelected === ButtonStatus.ThumbsDown
              ? classes.no_selected
              : classes.no
          }
          onClick={() => setButtonSelected(ButtonStatus.ThumbsDown)}
        >
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
