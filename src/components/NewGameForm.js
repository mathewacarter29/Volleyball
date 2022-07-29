import { useState, useRef } from "react";
import classes from "./NewGameForm.module.css";
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/lab";
import { TextField } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Dropdown from "../ui/Dropdown";

function NewGameForm(props) {
  //const DUMMY_LOCATIONS = ["Bayberry", "Rye"];
  //const DUMMY_TEAMS = ["Bayberry Volleyball", "Clinic", "Rye Beach Volleyball"];

  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [location, setLocation] = useState(props.locations[0]);
  const descriptionInputRef = useRef();
  const [team, setTeam] = useState(props.teams[0]);

  function createHandler(event) {
    event.preventDefault();
    const game = {
      date: date.toLocaleDateString("en-US", {
        day: "numeric",
        weekday: "long",
        month: "long",
        year: "numeric",
      }),
      start_time: startTime.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      }),
      end_time: endTime.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      }),
      location: location,
      numIn: 0,
      numOut: 0,
      team: team,
      description: descriptionInputRef.current.value,
    };
    props.addNewGame(game);
  }

  function locationChangeHandler(event) {
    setLocation(event.target.value);
  }

  function teamChangeHandler(event) {
    setTeam(event.target.value);
  }

  return (
    <form className={classes.form} onSubmit={createHandler}>
      <h2>Create a new game</h2>
      <div className={classes.pickers}>
        <div className={classes.grey}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date"
              value={date}
              onChange={(date) => setDate(date)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
        <div className={classes.times}>
          <div className={classes.grey}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="Start Time"
                value={startTime}
                onChange={(time) => {
                  setStartTime(time);
                  let newEndTime = new Date(time.valueOf());
                  newEndTime.setHours(newEndTime.getHours() + 2);
                  setEndTime(newEndTime);
                }}
                renderInput={(params) => <TextField {...params} />}
                minutesStep={5}
              />
            </LocalizationProvider>
          </div>
          <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="End Time"
                value={endTime}
                onChange={(time) => {
                  setEndTime(time);
                }}
                renderInput={(params) => (
                  <TextField
                    style={{ marginTop: "1vw", backgroundColor: "#e0e0e0" }}
                    {...params}
                  />
                )}
                minutesStep={5}
              />
            </LocalizationProvider>
          </div>
        </div>
      </div>
      <label htmlFor="locations">Location</label>
      <Dropdown
        id="locations"
        options={props.locations}
        onChange={locationChangeHandler}
      />
      <label htmlFor="teams">Team</label>
      <Dropdown id="teams" options={props.teams} onChange={teamChangeHandler} />
      <div className={classes.description}>
        <label htmlFor="description">Description</label>
        <textarea id="description" rows="5" ref={descriptionInputRef} />
      </div>
      <div className={classes.create}>
        <button>Create</button>
      </div>
    </form>
  );
}

export default NewGameForm;
