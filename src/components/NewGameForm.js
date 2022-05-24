import { useRef, useState } from "react";
import classes from "./NewGameForm.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function NewGameForm(props) {
  const [date, setDate] = useState(new Date());

  function createHandler() {
    console.log("create button pressed");
  }

  return (
    <div className={classes.main}>
      <form className={classes.form} onSubmit={createHandler}>
        <div>
          <label htmlFor="date">Choose a Date</label>
          <DatePicker
            className={classes.date}
            id="date"
            selected={date}
            onChange={(date) => setDate(date)}
            popperPlacement="bottom"
          />
        </div>
      </form>
    </div>
  );
}

export default NewGameForm;
