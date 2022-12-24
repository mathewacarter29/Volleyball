import GameList from "../components/GameList";
import { useEffect, useState } from "react";
import firebase from "../util/firebase";
import {
  getDatabase,
  ref,
  orderByChild,
  query,
  onValue,
} from "firebase/database";

function CalendarPage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  //Get all the current games in the database
  useEffect(() => {
    const db = getDatabase(firebase);
    const gamesQuery = query(ref(db, "games"), orderByChild("start_time"));
    // onValue executes the query and uses a function to use the snapshot
    onValue(gamesQuery, (snapshot) => {
      const gamesData = [];
      // using forEach ensures the order of the query is preserved
      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        const start = new Date(data.start_time);
        const end = new Date(data.end_time);
        const game = {
          id: childSnapshot.key,
          day: new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
            start
          ),
          date: start.toLocaleDateString("en-US", {
            day: "numeric",
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
          location: data.location,
          team: data.team,
          description: data.description,
        };
        // check here if the game is after the current time
        if (end.getTime() > Date.now()) {
          gamesData.push(game);
        }
      });
      setGames(gamesData);
      setLoading(false);
    });
  }, []);

  return !loading && <GameList games={games} />;
}

export default CalendarPage;
