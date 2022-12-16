import GameList from "../components/GameList";
import { useEffect, useState } from "react";
import firebase from "../util/firebase";
import { getDatabase, ref, get } from "firebase/database";

function CalendarPage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  /*
  Time will always be in the following format
  xx:xx <Merediem Indicator>
  */
  function getTimeInSeconds(timeString) {
    const defaultTimePrefix = "Thu, 01 Jan 1970";
    const time = timeString.substring(0, timeString.length - 3);
    let numSeconds = Date.parse(`${defaultTimePrefix} ${time}`);
    if (timeString.endsWith(" PM")) {
      // Add 12 hours to the time
      // (1000 ms) * (60 sec) * (60 min) * (12 hours)
      numSeconds += 1000 * 60 * 60 * 12;
    }
    return numSeconds;
  }

  //Get all the current games in the database
  useEffect(() => {
    const db = getDatabase(firebase);
    // get() returns a DataSnapshot object
    get(ref(db, "/games")).then((snapshot) => {
      // data is taken out of a DataSnapshot with the val() function
      const data = snapshot.val();
      const gamesData = [];
      for (const key in data) {
        const game = {
          id: key,
          ...data[key],
        };
        // check here if the game is after the current time
        const expTime =
          Date.parse(`${game.date} 00:00:00 GMT`) +
          getTimeInSeconds(game.end_time);
        if (expTime > Date.now()) {
          gamesData.push(game);
        }
      }
      setGames(gamesData);
      setLoading(false);
    });
  }, []);

  return !loading && <GameList games={games} />;
}

export default CalendarPage;
