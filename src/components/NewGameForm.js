import { useState, useRef } from "react";
import classes from "./NewGameForm.module.css";
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/lab";
import { TextField } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Dropdown from "../ui/Dropdown";

function NewGameForm(props) {
  const DUMMY_LOCATIONS = ["Bayberry", "Rye"];
  const DUMMY_TEAMS = ["Bayberry Volleyball", "Clinic", "Rye Beach Volleyball"];

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [location, setLocation] = useState(DUMMY_LOCATIONS[0]);
  const descriptionInputRef = useRef();
  const [team, setTeam] = useState("Bayberry Volleyball");

  function createHandler(event) {
    event.preventDefault();
    console.log("create button pressed");
    console.log(location);
    console.log(date.toDateString());
    console.log(time.toLocaleTimeString());
    console.log(descriptionInputRef.current.value);
    console.log(team);
  }

  function locationChangeHandler(event) {
    setLocation(event.target.value);
  }

  function teamChangeHandler(event) {
    setTeam(event.target.value);
  }

  return (
    <div className={classes.main}>
      <form className={classes.form} onSubmit={createHandler}>
        <h2>Create a new game</h2>
        <div className={classes.pickers}>
          <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                value={date}
                onChange={(date) => setDate(date)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="Time"
                value={time}
                onChange={(time) => {
                  setTime(time);
                }}
                renderInput={(params) => <TextField {...params} />}
                minutesStep={5}
              />
            </LocalizationProvider>
          </div>
        </div>
        <label htmlFor="locations">Locations</label>
        <Dropdown
          id="locations"
          options={DUMMY_LOCATIONS}
          onChange={locationChangeHandler}
        />
        <label htmlFor="teams">Team</label>
        <Dropdown
          id="teams"
          options={DUMMY_TEAMS}
          onChange={teamChangeHandler}
        />
        <div className={classes.description}>
          <label htmlFor="description">Description</label>
          <textarea id="description" rows="5" ref={descriptionInputRef} />
        </div>
        <div className={classes.create}>
          <button>Create</button>
        </div>
      </form>
    </div>
  );
}

export default NewGameForm;
