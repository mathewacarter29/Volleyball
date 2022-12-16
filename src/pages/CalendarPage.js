import GameList from "../components/GameList";
import { useEffect, useState } from "react";
import firebase from "../util/firebase";
import { getDatabase, ref, get } from "firebase/database";

function CalendarPage() {
  // const DUMMY_GAMES = [
  //   {
  //     date: "May 32, 2069",
  //     start_time: "6:00pm",
  //     end_time: "8:00pm",
  //     location: "Bayberry",
  //     numIn: 10,
  //     numOut: 2,
  //     team: "Rye",
  //     description: "",
  //   },
  //   {
  //     date: "June 1, 2069",
  //     start_time: "6:00pm",
  //     end_time: "8:00pm",
  //     location: "Bayberry",
  //     numIn: 9,
  //     numOut: 1,
  //     team: "Bayberry Volleyball",
  //     description:
  //       "I just want to test what happens if i put a really long description for a " +
  //       "game so i am going to keep writing as far as I can see on my screen",
  //   },
  //   {
  //     date: "June 4, 2069",
  //     start_time: "6:00pm",
  //     end_time: "8:00pm",
  //     location: "Bayberry",
  //     numIn: 8,
  //     numOut: 15,
  //     team: "Bayberry Volleyball",
  //     description: "",
  //   },
  //   {
  //     date: "June 4, 2069",
  //     start_time: "6:00pm",
  //     end_time: "8:00pm",
  //     location: "Bayberry",
  //     numIn: 8,
  //     numOut: 15,
  //     team: "Clinic",
  //     description: "This is the clinic for the kids",
  //   },
  // ];

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
        const game = {
          id: key,
          ...data[key],
        };
        gamesData.push(game);
      }
      setGames(gamesData);
      setLoading(false);
    });
  }, []);

  return !loading && <GameList games={games} />;
}

export default CalendarPage;
