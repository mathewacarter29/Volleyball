import React from "react";
import classes from "./Modal.module.css";

function Modal(props) {
  return (
    <div className={classes.modal} onClick={props.onClose}>
      <div
        className={classes.modal_content}
        /*stopPropagation() basically just stops an event from happening */
        onClick={(e) => e.stopPropagation()}
      >
        <div className={classes.modal_header}>
          <h2>{props.title}</h2>
        </div>
        <div className={classes.modal_body}>{props.children}</div>
        <div className={classes.modal_footer}>
          <button onClick={props.onClose} className={classes.button}>
            Close
          </button>
          {props.submitButton && (
            <button
              onClick={props.onClose}
              className={`${classes.button} ${classes.submit}`}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
