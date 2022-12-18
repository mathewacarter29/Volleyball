import GameList from "../components/GameList";
import { useEffect, useState } from "react";
import firebase from "../util/firebase";
import { getDatabase, ref, get } from "firebase/database";

function CalendarPage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  //Get all the current games in the database
  useEffect(() => {
    const db = getDatabase(firebase);
    // get() returns a DataSnapshot object
    get(ref(db, "/games")).then((snapshot) => {
      // data is taken out of a DataSnapshot with the val() function
      const data = snapshot.val();
      const gamesData = [];
      for (const key in data) {
        const start = new Date(data[key].start_time);
        const end = new Date(data[key].end_time);
        const game = {
          id: key,
          date: start.toLocaleDateString("en-US", {
            day: "numeric",
            weekday: "long",
            month: "long",
            year: "numeric",
          }),
          start_time: start.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          }),
          end_time: end.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          }),
          location: data[key].location,
          team: data[key].team,
          description: data[key].description,
        };
        // check here if the game is after the current time
        if (end.getTime() > Date.now()) {
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
