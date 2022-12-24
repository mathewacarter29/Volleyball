import classes from "./Modal.module.css";

function ErrorModal(props) {
  return (
    <div className={classes.modal} style={{ color: "red", zIndex: "2000" }}>
      <div
        className={classes.modal_content}
        /*stopPropagation() basically just stops an event from happening */
        onClick={(e) => e.stopPropagation()}
      >
        <div className={classes.modal_header}>
          <h2>{props.title}</h2>
        </div>
        <div className={classes.modal_body}>
          <h2>{props.message}</h2>
        </div>
        <div className={classes.modal_footer}>
          <button onClick={props.onClose} className={classes.button}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorModal;
