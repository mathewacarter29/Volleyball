import modalClasses from "../ui/Modal.module.css";

function EditModal(props) {
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
          <h2>Not yet implemented</h2>
        </div>
        <div className={modalClasses.modal_footer}>
          <button onClick={props.onClose} className={modalClasses.button}>
            Close
          </button>
          {/*This onClick will change the game data in the database */}
          <button
            onClick={props.onClose}
            className={`${modalClasses.button} ${modalClasses.submit}`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
