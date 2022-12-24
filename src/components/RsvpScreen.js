import classes from "./RsvpScreen.module.css";
import modalClasses from "../ui/Modal.module.css";
import thumbsUp from "../media/thumbs_up.png";
import thumbsDown from "../media/thumbs_down.png";
import firebase from "../util/firebase";
import { getDatabase, ref, set } from "firebase/database";
import { useRef, useState } from "react";
import ErrorMessage from "../ui/ErrorMessage";

function RsvpScreen(props) {
  const dummyName = "Dummy McDumbdumb";
  const ButtonStatus = {
    None: "none",
    ThumbsUp: "in",
    ThumbsDown: "out",
  };
  const defaultError = { title: "", message: "" };
  const descriptionInputRef = useRef();
  const [buttonSelected, setButtonSelected] = useState(ButtonStatus.None);
  const [error, setError] = useState(defaultError);

  async function rsvp() {
    if (buttonSelected === ButtonStatus.None) {
      const newError = {
        title: "No RSVP Status Selected",
        message:
          'You must click "In" or "Out" button in order to submit your RSVP status',
      };
      setError(newError);
      setTimeout(() => setError(defaultError), 10000);
      return;
    }
    const db = getDatabase(firebase);
    const dbRef = ref(db, `games/${props.gameId}/players/${dummyName}`);

    let value = buttonSelected;
    if (descriptionInputRef.current.value !== "") {
      value += ` ${descriptionInputRef.current.value}`;
    }
    let obj = {};
    obj[dummyName] = value;
    await set(dbRef, value);
    props.onClose();
  }
  return (
    <div className={modalClasses.modal} onClick={props.onClose}>
      <div
        className={modalClasses.modal_content}
        /*stopPropagation() basically just stops an event from happening */
        onClick={(e) => e.stopPropagation()}
      >
        <div className={modalClasses.modal_header}>
          <h2>{props.title}</h2>
        </div>
        <div className={modalClasses.modal_body}>
          {/*Below starts the RSVP component */}
          <div className={classes.rsvp}>
            {/*Checking if two javascript objects have all the same values is annoying
            instead, just check all the values inside it */}
            {error.title !== "" && error.message !== "" && (
              <ErrorMessage title={error.title} message={error.message} />
            )}
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
                <img src={thumbsUp} alt={"In"}></img>
              </button>
              <button
                className={
                  buttonSelected === ButtonStatus.ThumbsDown
                    ? classes.no_selected
                    : classes.no
                }
                onClick={() => setButtonSelected(ButtonStatus.ThumbsDown)}
              >
                <img src={thumbsDown} alt={"Out"}></img>
              </button>
            </div>
            <div className={classes.description}>
              <label htmlFor="description">Note</label>
              <textarea id="description" rows="5" ref={descriptionInputRef} />
            </div>
          </div>
        </div>
        <div className={modalClasses.modal_footer}>
          <button onClick={props.onClose} className={modalClasses.button}>
            Close
          </button>
          <button
            onClick={() => rsvp()}
            className={`${modalClasses.button} ${modalClasses.submit}`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default RsvpScreen;
